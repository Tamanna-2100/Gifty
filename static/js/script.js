// Quiz data structure
const questions = [
    {
        id: 1,
        type: 'input',
        question: "What's the person's name?",
        inputType: 'text',
        placeholder: "Enter their name",
        field: 'name'
    },
    {
        id: 2,
        type: 'input',
        question: "What's your budget for this gift?",
        inputType: 'text',
        placeholder: "Enter amount in dollars",
        field: 'budget'
    },
    {
        id: 3,
        type: 'multiple',
        question: "What's their age group?",
        field: 'age',
        options: [
            { text: 'Baby', value: 'baby', emoji: '👶', imageKeyword: 'baby,portrait' },
            { text: 'Toddler', value: 'toddler', emoji: '🧒', imageKeyword: 'toddler,portrait' },
            { text: 'Kid (5-10)', value: 'kid', emoji: '👧', imageKeyword: 'child,portrait' },
            { text: 'Pre-Teen (11-13)', value: 'preteen', emoji: '🧑', imageKeyword: 'preteen,portrait' },
            { text: 'Teen (13-18)', value: 'teen', emoji: '👦', imageKeyword: 'teenager,portrait' },
            { text: 'Young Adult (19-30)', value: 'young-adult', emoji: '👨', imageKeyword: 'young-man,portrait' },
            { text: 'Adult (31-50)', value: 'adult', emoji: '👔', imageKeyword: 'man,portrait' },
            { text: 'Senior (50+)', value: 'senior', emoji: '👴', imageKeyword: 'senior-citizen,portrait' }
        ]
    },
    {
        id: 4,
        type: 'multiple',
        question: "Are they more introverted or extroverted?",
        field: 'personality',
        options: [
            { text: 'Introverted', value: 'introvert', emoji: '🤫', imageKeyword: 'reading,book' },
            { text: 'Extroverted', value: 'extrovert', emoji: '🎉', imageKeyword: 'party,dancing' },
            { text: 'Ambivert', value: 'ambivert', emoji: '🔄', imageKeyword: 'coffee-shop,friends' }
        ]
    },
    {
        id: 5,
        type: 'multiple',
        question: "What's their climate/environment?",
        field: 'climate',
        options: [
            { text: 'Cold', value: 'cold', emoji: '❄️', imageKeyword: 'snow,winter-coat' },
            { text: 'Warm', value: 'warm', emoji: '☀️', imageKeyword: 'sunny-beach' },
            { text: 'Moderate', value: 'moderate', emoji: '🍂', imageKeyword: 'autumn-park' }
        ]
    },
    {
        id: 6,
        type: 'multiple',
        question: "What's their personal style?",
        field: 'style',
        options: [
            { text: 'Trendy', value: 'trendy', emoji: '✨', imageKeyword: 'fashion-model,streetwear' },
            { text: 'Classic', value: 'classic', emoji: '👔', imageKeyword: 'suit,business-attire' },
            { text: 'Artsy', value: 'artsy', emoji: '🎨', imageKeyword: 'artist,painting' },
            { text: 'Sporty', value: 'sporty', emoji: '⚡', imageKeyword: 'athlete,gym' },
            { text: 'Casual', value: 'casual', emoji: '👕', imageKeyword: 'jeans,t-shirt' },
            { text: "Don't Know", value: 'unknown', emoji: '❓', imageKeyword: 'gift-box,wrapped' }
        ]
    },
    {
        id: 7,
        type: 'color-schemes',
        question: "What color schemes do they usually wear?",
        field: 'colorScheme',
        options: [
            {
                name: 'Basics',
                value: 'basics',
                colors: ['#2c232d', '#464347', '#524a51', '#dfddce', '#f0f0e9']
            },
            {
                name: 'Dark Colors',
                value: 'dark',
                colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b']
            },
            {
                name: 'Warm Tones',
                value: 'vibrant',
                colors: ['#96231c', '#c93926', '#b55a1d', '#da7c26', '#f5a442']
            },
            {
                name: 'Pastels',
                value: 'pastels',
                colors: ['#fef2f2', '#fff1f2', '#fff7ed', '#f0fdf4', '#eff6ff']
            },
            {
                name: 'Cool Tones',
                value: 'cool',
                colors: ['#6e19bd', '#5e60ce', '#35a7db', '#6ebed6', '#78f6dc']
            }
        ]
    },
    {
        id: 8,
        type: 'multiple',
        question: "What type of bag do they usually carry?",
        field: 'bag',
        options: [
            { text: 'Small Purse', value: 'small-purse', emoji: '👛', imageKeyword: 'purse,handbag' },
            { text: 'Fanny Pack', value: 'fanny-pack', emoji: '👝', imageKeyword: 'fanny-pack' },
            { text: 'Backpack', value: 'backpack', emoji: '🎒', imageKeyword: 'backpack' },
            { text: 'Tote', value: 'tote', emoji: '👜', imageKeyword: 'tote-bag' },
            { text: 'None', value: 'none', emoji: '🚫', imageKeyword: 'empty-pocket' }
        ]
    },
    {
        id: 9,
        type: 'multiple',
        question: "Do they wear glasses or sunglasses daily?",
        field: 'glasses',
        options: [
            { text: 'Yes - Prescription Glasses', value: 'yes', emoji: '👓', imageKeyword: 'glasses,face' },
            { text: 'No', value: 'no', emoji: '🚫', imageKeyword: 'face-portrait' }
        ]
    },
    {
        id: 10,
        type: 'multiple',
        question: "What kind of food do they typically eat? (Optional)",
        field: 'food',
        options: [
            { text: 'Healthy/Salads', value: 'healthy', emoji: '🥗', imageKeyword: 'salad,bowl' },
            { text: 'Fast Food', value: 'fast-food', emoji: '🍔', imageKeyword: 'mcdonalds,burger' },
            { text: 'Home-cooked', value: 'homemade', emoji: '🍜', imageKeyword: 'home-cooked-meal' },
            { text: 'Vegetarian/Vegan', value: 'plant-based', emoji: '🌱', imageKeyword: 'vegetables,fresh' },
            { text: 'Skip This', value: 'skip', emoji: '⏭️', imageKeyword: 'empty-plate' }
        ]
    }
];

let currentQuestionIndex = 0;
let answers = {};

// Start the quiz
function startQuiz() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');
    document.getElementById('total-questions').textContent = questions.length;
    showQuestion(0);
}

// Display a question
function showQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    const container = document.getElementById('question-container');

    // Update progress
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('current-question').textContent = index + 1;

    let html = `<div class="question">
        <h3>${question.question}</h3>`;

    if (question.type === 'input') {
        const value = answers[question.field] || '';
        html += `
            <div class="input-group">
                <input type="${question.inputType}" 
                       id="answer-${question.id}" 
                       placeholder="${question.placeholder}"
                       value="${value}"
                       onchange="saveAnswer('${question.field}', this.value)">
            </div>`;
    } else if (question.type === 'color-schemes') {
        html += `<div class="color-schemes-grid">`;
        question.options.forEach(option => {
            const selected = answers[question.field] === option.value ? 'selected' : '';
            html += `
                <div class="color-scheme-option ${selected}" 
                     onclick="selectColorScheme('${question.field}', '${option.value}', this)">
                     <!-- New Stripe Design -->
                    <div class="color-stripe-container">
                        ${option.colors.map(c => `<div class="color-stripe" style="background-color: ${c}"></div>`).join('')}
                    </div>
                    <div class="color-scheme-name">${option.name}</div>
                </div>`;
        });
        html += `</div>`;
    } else if (question.type === 'multiple') {
        // Use Image Grid if keywords exist
        if (question.options[0].imageKeyword) {
            html += `<div class="buzzfeed-grid">`;
            question.options.forEach(option => {
                const selected = answers[question.field] === option.value ? 'selected' : '';
                // Using loremflickr for real demo images
                const imgUrl = `https://loremflickr.com/320/240/${option.imageKeyword},lifestyle/all`;

                html += `
                    <div class="option-card ${selected}" 
                            onclick="selectOption('${question.field}', '${option.value}', this)">
                        <div class="option-image" style="background-image: url('${imgUrl}')"></div>
                        <div class="option-label">
                            <span class="option-emoji">${option.emoji || ''}</span>
                            ${option.text}
                        </div>
                    </div>`;
            });
            html += `</div>`;
        } else {
            // Standard Button Layout (fallback)
            html += `<div class="options">`;
            question.options.forEach(option => {
                const selected = answers[question.field] === option.value ? 'selected' : '';
                const emoji = option.emoji || '';
                html += `
                    <button class="option-btn ${selected}" 
                            onclick="selectOption('${question.field}', '${option.value}', this)">
                        ${emoji ? `<span class="option-emoji">${emoji}</span>` : ''}
                        ${option.text}
                    </button>`;
            });
            html += `</div>`;
        }
    }

    html += `
        <div class="nav-buttons">
            ${index > 0 ? '<button class="nav-btn prev" onclick="prevQuestion()">← Previous</button>' : '<div></div>'}
            ${index < questions.length - 1
            ? '<button class="nav-btn next" onclick="nextQuestion()">Next →</button>'
            : '<button class="nav-btn next" onclick="showResults()">See Results →</button>'}
        </div>
    </div>`;

    container.innerHTML = html;
}

// Save text input answer
function saveAnswer(field, value) {
    answers[field] = value;
}

// Select color scheme
function selectColorScheme(field, value, element) {
    answers[field] = value;

    // Remove selected class from all schemes
    element.parentElement.querySelectorAll('.color-scheme-option').forEach(scheme => {
        scheme.classList.remove('selected');
    });

    // Add selected class to clicked scheme
    element.classList.add('selected');
}

// Toggle color selection (multi-select) - DEPRECATED but kept for compatibility
function toggleColor(field, value, element) {
    if (!answers[field]) {
        answers[field] = [];
    }

    const index = answers[field].indexOf(value);
    if (index > -1) {
        answers[field].splice(index, 1);
        element.classList.remove('selected');
    } else {
        answers[field].push(value);
        element.classList.add('selected');
    }
}

// Select single option
function selectOption(field, value, element) {
    answers[field] = value;

    // Remove selected class from all options
    element.parentElement.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selected class to clicked option
    element.classList.add('selected');
}

// Navigation functions
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Generate gift recommendations
function showResults() {
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('results-page').classList.add('active');

    document.getElementById('person-name').textContent = answers.name || 'Your Friend';
    document.getElementById('budget-amount').textContent = `$${answers.budget || '50'}`;

    const recommendations = generateRecommendations(answers);
    displayRecommendations(recommendations);
}

// Smart gift recommendation logic based on specifications
function generateRecommendations(profile) {
    const budget = parseInt(profile.budget) || 50;
    const gifts = [];

    // Personality-Based Gifts
    if (profile.personality === 'introvert') {
        gifts.push(
            { name: 'Journal', category: 'Stationery', description: 'Beautiful journal for thoughts and reflections.', priceRange: '$12-25', stores: ['Amazon', 'Target', 'Etsy'] },
            { name: 'Planner', category: 'Organization', description: 'Elegant planner for organizing life.', priceRange: '$15-30', stores: ['Amazon', 'Target'] },
            { name: 'Scented Candle', category: 'Home', description: 'Calming candle for peaceful moments.', priceRange: '$15-30', stores: ['Target', 'Ulta', 'Etsy'] },
            { name: 'Cozy Socks', category: 'Accessories', description: 'Soft, comfortable socks for relaxing at home.', priceRange: '$10-20', stores: ['Amazon', 'Target', 'Kohls'] },
            { name: 'Bookstore Gift Card', category: 'Gift Cards', description: 'Barnes & Noble gift card for book lovers.', priceRange: '$15-50', stores: ['Amazon'] },
            { name: 'Minimal Desk Decor', category: 'Home', description: 'Simple, elegant desk organization.', priceRange: '$15-35', stores: ['Amazon', 'Target', 'Etsy'] }
        );
    } else if (profile.personality === 'extrovert') {
        gifts.push(
            { name: 'Fun Mug', category: 'Drinkware', description: 'Colorful mug with witty design.', priceRange: '$12-25', stores: ['Amazon', 'Target', 'Etsy'] },
            { name: 'Statement Accessory', category: 'Fashion', description: 'Bold jewelry or accessory piece.', priceRange: '$20-45', stores: ['Amazon', 'Etsy', 'Kohls'] },
            { name: 'Experience Gift Card', category: 'Gift Cards', description: 'Gift card for activities and fun.', priceRange: '$25-75', stores: ['Amazon', 'Target'] },
            { name: 'Bright Socks', category: 'Accessories', description: 'Vibrant, patterned socks.', priceRange: '$10-20', stores: ['Amazon', 'Target'] },
            { name: 'Conversation Starter Decor', category: 'Home', description: 'Fun, unique home decoration.', priceRange: '$15-40', stores: ['Amazon', 'Target', 'Etsy'] }
        );
    } else if (profile.personality === 'ambivert') {
        gifts.push(
            { name: 'Neutral Planner', category: 'Organization', description: 'Versatile planner for any lifestyle.', priceRange: '$15-30', stores: ['Amazon', 'Target'] },
            { name: 'Board/Card Game', category: 'Entertainment', description: 'Fun game for any gathering size.', priceRange: '$15-35', stores: ['Amazon', 'Target', 'Walmart'] },
            { name: 'Stylish Water Bottle', category: 'Drinkware', description: 'Modern insulated water bottle.', priceRange: '$20-35', stores: ['Amazon', 'Target'] },
            { name: 'Versatile Accessory', category: 'Fashion', description: 'Accessory that works with any style.', priceRange: '$15-35', stores: ['Amazon', 'Etsy', 'Target'] }
        );
    }

    // Climate-Based Gifts
    if (profile.climate === 'cold') {
        gifts.push(
            { name: 'Scarf', category: 'Accessories', description: 'Warm, cozy scarf for winter.', priceRange: '$15-35', stores: ['Amazon', 'Kohls', 'Target'], accessory: true },
            { name: 'Beanie/Hat', category: 'Accessories', description: 'Stylish winter hat.', priceRange: '$12-28', stores: ['Amazon', 'Kohls', 'Target'], accessory: true },
            { name: 'Gloves', category: 'Accessories', description: 'Warm gloves for cold weather.', priceRange: '$15-30', stores: ['Amazon', 'Kohls', 'Target'], accessory: true },
            { name: 'Hand Muff', category: 'Accessories', description: 'Cozy hand warmer muff.', priceRange: '$20-40', stores: ['Amazon', 'Etsy'], accessory: true },
            { name: 'Thermal Socks', category: 'Accessories', description: 'Extra warm socks for winter.', priceRange: '$12-25', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Cozy Blanket', category: 'Home', description: 'Ultra-soft throw blanket.', priceRange: '$25-50', stores: ['Amazon', 'Target', 'Kohls'] }
        );
    } else if (profile.climate === 'warm') {
        gifts.push(
            { name: 'Summer Hat/Cap', category: 'Accessories', description: 'Stylish hat for sun protection.', priceRange: '$15-30', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Sunglasses', category: 'Accessories', description: 'Trendy sunglasses.', priceRange: '$20-50', stores: ['Amazon', 'Kohls', 'Target'], accessory: true, requiresGlasses: false },
            { name: 'Light Summer Scarf', category: 'Accessories', description: 'Breathable fashion scarf.', priceRange: '$12-25', stores: ['Amazon', 'Etsy', 'Target'], accessory: true },
            { name: 'Insulated Water Bottle', category: 'Drinkware', description: 'Keeps drinks cold all day.', priceRange: '$20-35', stores: ['Amazon', 'Target'] }
        );
    } else if (profile.climate === 'moderate') {
        gifts.push(
            { name: 'Shawl', category: 'Accessories', description: 'Elegant wrap for any occasion.', priceRange: '$20-45', stores: ['Amazon', 'Etsy', 'Kohls'], accessory: true },
            { name: 'Light Scarf', category: 'Accessories', description: 'Versatile scarf for layering.', priceRange: '$15-30', stores: ['Amazon', 'Target', 'Etsy'], accessory: true },
            { name: 'Candle Set', category: 'Home', description: 'Seasonal scented candles.', priceRange: '$20-40', stores: ['Target', 'Ulta', 'Etsy'] },
            { name: 'Indoor Decor', category: 'Home', description: 'Stylish home decoration.', priceRange: '$15-40', stores: ['Amazon', 'Target', 'Etsy'] }
        );
    }

    // Style-Based Gifts
    if (profile.style === 'trendy') {
        gifts.push(
            { name: 'Viral Accessory', category: 'Fashion', description: 'Trending accessory piece.', priceRange: '$15-40', stores: ['Amazon', 'Etsy', 'Target'], accessory: true },
            { name: 'Sleek Planner', category: 'Organization', description: 'Modern, minimalist planner.', priceRange: '$18-35', stores: ['Amazon', 'Target'] }
        );
    } else if (profile.style === 'classic') {
        gifts.push(
            { name: 'Neutral Scarf', category: 'Accessories', description: 'Timeless scarf in classic colors.', priceRange: '$20-40', stores: ['Kohls', 'Amazon', 'Target'], accessory: true },
            { name: 'Leather Belt', category: 'Accessories', description: 'Quality leather belt.', priceRange: '$25-50', stores: ['Amazon', 'Kohls'], accessory: true }
        );
    } else if (profile.style === 'artsy') {
        gifts.push(
            { name: 'Unique Pins', category: 'Accessories', description: 'Artistic enamel pins.', priceRange: '$10-25', stores: ['Etsy', 'Amazon'], accessory: true },
            { name: 'Patterned Scarf', category: 'Accessories', description: 'Artistic design scarf.', priceRange: '$15-35', stores: ['Etsy', 'Amazon', 'Target'], accessory: true }
        );
    } else if (profile.style === 'sporty') {
        gifts.push(
            { name: 'Athletic Cap', category: 'Accessories', description: 'Sporty baseball cap.', priceRange: '$15-30', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Performance Socks', category: 'Accessories', description: 'Athletic compression socks.', priceRange: '$12-25', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Sport Water Bottle', category: 'Sports', description: 'High-performance water bottle.', priceRange: '$20-35', stores: ['Amazon', 'Target'] }
        );
    } else if (profile.style === 'casual') {
        gifts.push(
            { name: 'Cozy Hoodie', category: 'Clothing', description: 'Comfortable pullover hoodie.', priceRange: '$30-60', stores: ['Amazon', 'Target', 'Kohls'] },
            { name: 'Casual Beanie', category: 'Accessories', description: 'Relaxed style beanie.', priceRange: '$12-25', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Tote Bag', category: 'Accessories', description: 'Versatile canvas tote.', priceRange: '$15-30', stores: ['Amazon', 'Target', 'Etsy'], accessory: true }
        );
    } else if (profile.style === 'unknown') {
        gifts.push(
            { name: 'Neutral Gift Set', category: 'Gift Sets', description: 'Universal appeal gift set.', priceRange: '$20-45', stores: ['Amazon', 'Target', 'Ulta'] },
            { name: 'Classic Accessory', category: 'Accessories', description: 'Timeless neutral accessory.', priceRange: '$15-35', stores: ['Amazon', 'Target', 'Kohls'], accessory: true }
        );
    }

    // Bag-Based Add-Ons
    if (profile.bag === 'small-purse') {
        gifts.push(
            { name: 'Small Keychain', category: 'Accessories', description: 'Cute compact keychain.', priceRange: '$8-18', stores: ['Amazon', 'Etsy'], accessory: true },
            { name: 'Lip Balm Holder', category: 'Accessories', description: 'Keychain lip balm holder.', priceRange: '$10-20', stores: ['Amazon', 'Etsy'], accessory: true }
        );
    } else if (profile.bag === 'fanny-pack') {
        gifts.push(
            { name: 'Tiny Keychain', category: 'Accessories', description: 'Minimal keychain charm.', priceRange: '$8-15', stores: ['Amazon', 'Etsy'], accessory: true },
            { name: 'Fun Charm', category: 'Accessories', description: 'Decorative bag charm.', priceRange: '$10-20', stores: ['Etsy', 'Amazon'], accessory: true }
        );
    } else if (profile.bag === 'backpack') {
        gifts.push(
            { name: 'Large Keychain', category: 'Accessories', description: 'Statement keychain.', priceRange: '$10-25', stores: ['Amazon', 'Etsy'], accessory: true },
            { name: 'Backpack Pouch', category: 'Accessories', description: 'Organizer pouch for backpack.', priceRange: '$12-25', stores: ['Amazon', 'Target'], accessory: true }
        );
    } else if (profile.bag === 'tote') {
        gifts.push(
            { name: 'Medium Accessory', category: 'Accessories', description: 'Tote-sized accessory.', priceRange: '$15-30', stores: ['Amazon', 'Target', 'Etsy'], accessory: true },
            { name: 'Stylish Scarf', category: 'Accessories', description: 'Fashionable scarf.', priceRange: '$15-35', stores: ['Amazon', 'Target', 'Etsy'], accessory: true }
        );
    } else if (profile.bag === 'none') {
        gifts.push(
            { name: 'Wearable Item', category: 'Fashion', description: 'Stylish wearable accessory.', priceRange: '$15-35', stores: ['Amazon', 'Target', 'Kohls'], accessory: true },
            { name: 'Home Item', category: 'Home', description: 'Useful home decoration.', priceRange: '$15-40', stores: ['Amazon', 'Target', 'Etsy'] }
        );
    }

    // Glasses Wearers
    if (profile.glasses === 'yes') {
        gifts.push(
            { name: 'Glasses Case', category: 'Accessories', description: 'Protective case for glasses.', priceRange: '$10-25', stores: ['Amazon', 'Target'], accessory: true },
            { name: 'Clip-on Sunglasses', category: 'Accessories', description: 'Sunglasses that attach to glasses.', priceRange: '$15-30', stores: ['Amazon'], accessory: true }
        );
    }

    // Food Preferences (Optional)
    if (profile.food === 'healthy' || profile.food === 'plant-based') {
        gifts.push(
            { name: 'Healthy Snack Box', category: 'Food', description: 'Curated healthy snacks.', priceRange: '$20-40', stores: ['Amazon', 'Target'] }
        );
    }

    // Filter by budget
    let budgetFiltered = gifts.filter(gift => {
        const maxPrice = parseInt(gift.priceRange.split('-')[1].replace('$', ''));
        return maxPrice <= budget * 1.2;
    });

    // Apply color scheme preferences to accessories only
    if (profile.colorScheme) {
        const colorNote = getColorSchemeNote(profile.colorScheme);
        budgetFiltered = budgetFiltered.map(gift => {
            if (gift.accessory) {
                gift.colorNote = colorNote;
            }
            return gift;
        });
    }

    // Remove sunglasses if person wears daily glasses
    if (profile.glasses === 'yes') {
        budgetFiltered = budgetFiltered.filter(gift =>
            !(gift.name === 'Sunglasses' && !gift.name.includes('Clip-on'))
        );
    }

    // Return top recommendations
    return budgetFiltered.slice(0, 9);
}

// Get color scheme recommendation note
function getColorSchemeNote(colorScheme) {
    const schemes = {
        'basics': 'Recommended in: Black, White, or Brown',
        'dark': 'Recommended in: Dark Blue, Dark Green, Black, Brown, or Maroon',
        'vibrant': 'Recommended in: Yellow, Orange, Pink, or Red',
        'pastels': 'Recommended in: Light Blue, Light Green, Light Yellow, Light Pink, or Lilac',
        'beige': 'Recommended in: Brown, Tan/Skin tone, or Sand/Beige'
    };

    return schemes[colorScheme] || '';
}

// Display recommendations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');

    if (recommendations.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Try adjusting your budget or preferences to see more gift ideas!</p>
            </div>`;
        return;
    }

    container.innerHTML = recommendations.map(gift => `
        <div class="gift-card">
            <h3>${gift.name}</h3>
            <div class="category">${gift.category}</div>
            <p>${gift.description}</p>
            ${gift.colorNote ? `<p style="color: #fde68a; font-size: 0.9rem;">🎨 ${gift.colorNote}</p>` : ''}
            <div class="price">${gift.priceRange}</div>
            <div class="shop-links">
                ${gift.stores.map(store =>
        `<a href="https://www.${getStoreURL(store)}" target="_blank" class="shop-link">${store}</a>`
    ).join('')}
            </div>
        </div>
    `).join('');
}

// Navigation functions
function goHome() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('landing-page').classList.add('active');
}

function showSecretSanta() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('secret-santa-page').classList.add('active');
}

function showGeneralGifts() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('general-gifts-page').classList.add('active');
}

// Get store URLs
function getStoreURL(store) {
    const urls = {
        'Amazon': 'amazon.com',
        'Target': 'target.com',
        'Walmart': 'walmart.com',
        'Etsy': 'etsy.com',
        'Michaels': 'michaels.com',
        'Kohls': 'kohls.com',
        'Ulta': 'ulta.com',
        'Sephora': 'sephora.com'
    };
    return urls[store] || store.toLowerCase() + '.com';
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    answers = {};
    document.getElementById('results-page').classList.remove('active');
    document.getElementById('landing-page').classList.add('active');
}
