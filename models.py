from flask_sqlalchemy import SQLAlchemy
import uuid
import random

db = SQLAlchemy()

class SecretSantaGroup(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    budget = db.Column(db.String(50))
    admin_email = db.Column(db.String(120), nullable=False)
    expected_count = db.Column(db.Integer, default=0)
    members = db.relationship('GroupMember', backref='group', lazy=True)
    is_matched = db.Column(db.Boolean, default=False)

class GroupMember(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    group_id = db.Column(db.String(36), db.ForeignKey('secret_santa_group.id'), nullable=False)
    name = db.Column(db.String(100), nullable=True) # Name filled when quiz taken
    email = db.Column(db.String(120), nullable=False)
    token = db.Column(db.String(64), unique=True, default=lambda: str(uuid.uuid4().hex)) # For invite link
    is_quiz_completed = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(10), default='member') # 'admin' or 'member'
    assigned_recipient_id = db.Column(db.String(36), nullable=True) # ID of the person they are gifting TO
    quiz_profile = db.relationship('QuizProfile', uselist=False, backref='member', cascade="all, delete-orphan")

class QuizProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.String(36), db.ForeignKey('group_member.id'), nullable=False)
    
    # New Quiz Fields
    age_group = db.Column(db.String(50)) # Baby, Toddler, Child, etc.
    personality = db.Column(db.String(50)) # Introvert, Extrovert, Ambivert
    climate = db.Column(db.String(50)) # Cold, Warm, Springy, Summer
    style = db.Column(db.String(50)) # Trendy, Comfy, Classic...
    color_scheme = db.Column(db.String(50)) # Text or Hex
