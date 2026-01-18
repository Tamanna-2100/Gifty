from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, SecretSantaGroup, GroupMember, QuizProfile
import os
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here' # In production, use a secure env var
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gifty.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

# --- Secret Santa Logic ---

@app.route('/secret-santa/create', methods=['GET', 'POST'])
def create_group():
    if request.method == 'POST':
        name = request.form.get('group_name')
        budget = request.form.get('budget')
        admin_email = request.form.get('admin_email')
        emails_raw = request.form.get('participant_emails')
        
        # Process emails
        email_list = [e.strip() for e in emails_raw.split(',') if e.strip()]
        expected_count = len(email_list)
        
        if expected_count < 2:
            flash('You need at least 2 participants!', 'error')
            return redirect(url_for('create_group'))

        new_group = SecretSantaGroup(name=name, budget=budget, admin_email=admin_email, expected_count=expected_count)
        db.session.add(new_group)
        db.session.commit() # Commit to get ID
        
        # Create Members with Tokens
        for email in email_list:
            member = GroupMember(group_id=new_group.id, email=email, role='member') # Admin is separate or one of them? Assuming admin is just organizer
            # Check if admin email is in list? If not, maybe admin isn't participating? 
            # Prompt implies "Leader decides... adds people's emails... then email goes out".
            # Usually leader participates. We'll assume input includes leader if they want to play.
            db.session.add(member)
        
        db.session.commit()
        
        flash('Group created! Distribute the links below.', 'success')
        return redirect(url_for('group_dashboard', group_id=new_group.id))
        
    return render_template('create_group.html')

@app.route('/secret-santa/dashboard/<group_id>')
def group_dashboard(group_id):
    group = SecretSantaGroup.query.get_or_404(group_id)
    # Generate join links for display (Simulating Email)
    member_links = []
    for member in group.members:
        link = url_for('quiz_page', token=member.token, _external=True)
        member_links.append({'name': member.name or member.email, 'link': link, 'completed': member.is_quiz_completed})
        
    return render_template('dashboard.html', group=group, member_links=member_links)

@app.route('/secret-santa/quiz/<token>', methods=['GET', 'POST'])
def quiz_page(token):
    member = GroupMember.query.filter_by(token=token).first_or_404()
    group = member.group
    
    if member.is_quiz_completed:
        flash('You have already completed the quiz! Waiting for others.', 'info')
        return redirect(url_for('member_portal', member_id=member.id))
    
    if request.method == 'POST':
        member.name = request.form.get('name')
        member.is_quiz_completed = True
        
        # Save Quiz Data
        quiz_data = QuizProfile(
            age_group = request.form.get('age_group'),
            personality = request.form.get('personality'),
            climate = request.form.get('climate'),
            style = request.form.get('style'),
            color_scheme = request.form.get('color_scheme')
        )
        member.quiz_profile = quiz_data
        db.session.commit() # Save first
        
        # Check for Auto-Match
        completed_count = GroupMember.query.filter_by(group_id=group.id, is_quiz_completed=True).count()
        if completed_count == group.expected_count:
            perform_matching(group.id)
            flash('You were the last one! Matching complete.', 'success')
        else:
            flash('Quiz submitted! Waiting for everyone else to finish.', 'success')
            
        return redirect(url_for('member_portal', member_id=member.id))
        
    return render_template('join_group.html', group=group, member=member) # Reusing join_group as quiz page

def perform_matching(group_id):
    group = SecretSantaGroup.query.get(group_id)
    if not group or group.is_matched: return
    
    members = group.members
    if len(members) < 2: return
    
    random.shuffle(members)
    for i in range(len(members)):
        giver = members[i]
        receiver = members[(i + 1) % len(members)]
        giver.assigned_recipient_id = receiver.id
        
    group.is_matched = True
    db.session.commit()

# Kept for manual override if needed, but not primary flow anymore
@app.route('/secret-santa/match/<group_id>', methods=['POST'])
def match_names(group_id):
    perform_matching(group_id)
    return redirect(url_for('group_dashboard', group_id=group_id))

@app.route('/secret-santa/portal/<member_id>')
def member_portal(member_id):
    member = GroupMember.query.get_or_404(member_id)
    recipient = None
    gift_ideas = []
    
    if member.assigned_recipient_id:
        recipient = GroupMember.query.get(member.assigned_recipient_id)
        if recipient:
            gift_ideas = generate_gift_ideas(recipient.quiz_profile)
            
    return render_template('member_portal.html', member=member, recipient=recipient, gift_ideas=gift_ideas)

def generate_gift_ideas(profile):
    """Simple rule-based recommendation engine based on quiz answers."""
    ideas = []
    if not profile:
        return ["Gift Card"]
    
    # Logic based on Age
    if profile.age_group in ['Baby0-2', 'Toddler2-5']:
        ideas.append("Educational Plush Toy")
        ideas.append("Building Blocks")
    elif profile.age_group in ['Adult25-50', 'Senior50+']:
        ideas.append("Premium Coffee/Tea Set")
        ideas.append("Home Decor Piece")

    # Logic based on Personality
    if profile.personality == 'Introvert':
        ideas.append("Bestselling Novel")
        ideas.append("Noise Cancelling Headphones")
        ideas.append("Cozy Blanket")
    elif profile.personality == 'Extrovert':
        ideas.append("Party Game")
        ideas.append("Event Tickets")
        
    # Logic based on Style
    if profile.style == 'Bohemian':
        ideas.append("Macrame Plant Hanger")
        ideas.append("Crystal Diffuser")
    elif profile.style == 'Minimalist':
        ideas.append("Sleek Desk Organizer")
        ideas.append("Monochrome Planter")
    elif profile.style == 'Vintage':
        ideas.append("Record Player")
        ideas.append("Classic Film Camera")
        
    # Logic based on Climate
    if profile.climate == 'Cold':
        ideas.append("Heated Scarf")
        ideas.append("Thermal Mug")
    elif profile.climate == 'Summer':
        ideas.append("Beach Towel")
        ideas.append("Portable Fan")
        
    # Fill with generics if empty
    if len(ideas) < 3:
        ideas.extend(["Amazon Gift Card", "Gourmet Chocolates", "Scented Candle"])
        
    return list(set(ideas))[:5] # Return unique top 5

if __name__ == '__main__':
    app.run(debug=True)
