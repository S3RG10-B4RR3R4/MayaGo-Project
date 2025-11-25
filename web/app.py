"""
MayaGo - Flask Application
Main application file with routes and logic
"""

from flask import Flask, render_template, jsonify, request, abort
import json
from datetime import datetime
from pathlib import Path
from config import get_config

# Initialize Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(get_config('development'))

# Helper function to load JSON data
def load_json_file(filename):
    """Load and parse JSON file"""
    try:
        file_path = Path(__file__).parent.parent / 'data' / filename
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: {filename} not found")
        return {}
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in {filename}")
        return {}

# Load all data at startup
experiences_data = load_json_file('experiences.json')
users_data = load_json_file('users.json')
bookings_data = load_json_file('bookings.json')

# Extract lists from data
EXPERIENCES = experiences_data.get('experiences', [])
USERS = users_data.get('users', [])
BOOKINGS = bookings_data.get('bookings', [])

# ============================================================================
# TEMPLATE FILTERS
# ============================================================================

@app.template_filter('format_currency')
def format_currency(value, currency='USD'):
    """Format currency value"""
    symbols = {'USD': '$', 'MXN': '$', 'EUR': '€', 'CAD': 'CA$'}
    symbol = symbols.get(currency, '$')
    return f"{symbol}{value:,.2f}"

@app.template_filter('format_duration')
def format_duration(minutes):
    """Convert minutes to human-readable duration"""
    hours = minutes // 60
    mins = minutes % 60
    
    if hours == 0:
        return f"{mins} minutes"
    elif mins == 0:
        return f"{hours} hour{'s' if hours > 1 else ''}"
    else:
        return f"{hours}h {mins}m"

@app.template_filter('format_date')
def format_date(date_string):
    """Format date string"""
    try:
        date_obj = datetime.strptime(date_string, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    except:
        return date_string

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_experience_by_id(exp_id):
    """Get experience by ID"""
    for exp in EXPERIENCES:
        if exp['id'] == exp_id:
            return exp
    return None

def get_user_by_id(user_id):
    """Get user by ID"""
    for user in USERS:
        if user['id'] == user_id:
            return user
    return None

def filter_experiences(category=None, min_price=None, max_price=None, 
                      location=None, search_query=None):
    """Filter experiences based on criteria"""
    filtered = EXPERIENCES.copy()
    
    # Filter by category
    if category and category != 'all':
        filtered = [e for e in filtered if e.get('category') == category]
    
    # Filter by price range
    if min_price is not None:
        filtered = [e for e in filtered if e.get('price', 0) >= min_price]
    if max_price is not None:
        filtered = [e for e in filtered if e.get('price', 0) <= max_price]
    
    # Filter by location
    if location and location != 'all':
        filtered = [e for e in filtered 
                   if e.get('location', {}).get('city', '').lower() == location.lower()]
    
    # Filter by search query
    if search_query:
        query = search_query.lower()
        filtered = [e for e in filtered 
                   if query in e.get('title', '').lower() 
                   or query in e.get('short_description', '').lower()
                   or query in ' '.join(e.get('tags', [])).lower()]
    
    return filtered

def get_featured_experiences():
    """Get featured experiences"""
    return [e for e in EXPERIENCES if e.get('featured', False)]

def get_category_stats():
    """Get statistics for each category"""
    stats = {}
    for exp in EXPERIENCES:
        cat = exp.get('category', 'other')
        if cat not in stats:
            stats[cat] = 0
        stats[cat] += 1
    return stats

# ============================================================================
# ROUTES - PRESENTATION SITE
# ============================================================================

@app.route('/')
def index():
    """Landing page / Presentation"""
    featured = get_featured_experiences()[:3]  # Top 3 featured
    category_stats = get_category_stats()
    
    # Calculate some stats
    total_experiences = len(EXPERIENCES)
    total_providers = len([u for u in USERS if u.get('role') == 'provider'])
    total_reviews = sum(e.get('reviews_count', 0) for e in EXPERIENCES)
    avg_rating = sum(e.get('rating', 0) for e in EXPERIENCES) / len(EXPERIENCES) if EXPERIENCES else 0
    
    return render_template('index.html',
                         featured_experiences=featured,
                         total_experiences=total_experiences,
                         total_providers=total_providers,
                         total_reviews=total_reviews,
                         avg_rating=round(avg_rating, 1),
                         category_stats=category_stats,
                         categories=app.config['CATEGORIES'])

# ============================================================================
# ROUTES - DEMO APPLICATION
# ============================================================================

@app.route('/demo')
def demo():
    """Main demo page - Browse experiences"""
    # Get filter parameters
    category = request.args.get('category', 'all')
    location = request.args.get('location', 'all')
    search = request.args.get('search', '')
    min_price = request.args.get('min_price', type=int)
    max_price = request.args.get('max_price', type=int)
    
    # Filter experiences
    filtered_experiences = filter_experiences(
        category=category,
        min_price=min_price,
        max_price=max_price,
        location=location,
        search_query=search
    )
    
    # Sort by rating (default)
    sort_by = request.args.get('sort', 'rating')
    if sort_by == 'price_low':
        filtered_experiences.sort(key=lambda x: x.get('price', 0))
    elif sort_by == 'price_high':
        filtered_experiences.sort(key=lambda x: x.get('price', 0), reverse=True)
    elif sort_by == 'rating':
        filtered_experiences.sort(key=lambda x: x.get('rating', 0), reverse=True)
    elif sort_by == 'popular':
        filtered_experiences.sort(key=lambda x: x.get('bookings_count', 0), reverse=True)
    
    return render_template('demo.html',
                         experiences=filtered_experiences,
                         categories=app.config['CATEGORIES'],
                         locations=app.config['LOCATIONS'],
                         total_count=len(filtered_experiences),
                         current_category=category,
                         current_location=location,
                         search_query=search)

@app.route('/demo/experience/<int:experience_id>')
def experience_detail(experience_id):
    """Experience detail page"""
    experience = get_experience_by_id(experience_id)
    
    if not experience:
        abort(404)
    
    # Get provider info
    provider = get_user_by_id(experience.get('provider_id'))
    
    # Get related experiences (same category)
    related = [e for e in EXPERIENCES 
              if e.get('category') == experience.get('category') 
              and e.get('id') != experience_id][:3]
    
    return render_template('demo.html',
                         experience=experience,
                         provider=provider,
                         related_experiences=related,
                         show_detail=True)

@app.route('/demo/provider/<int:provider_id>')
def provider_profile(provider_id):
    """Provider profile page"""
    provider = get_user_by_id(provider_id)
    
    if not provider or provider.get('role') != 'provider':
        abort(404)
    
    # Get provider's experiences
    provider_experiences = [e for e in EXPERIENCES 
                           if e.get('provider_id') == provider_id]
    
    return render_template('demo.html',
                         provider=provider,
                         provider_experiences=provider_experiences,
                         show_provider=True)

# ============================================================================
# API ENDPOINTS (for AJAX requests)
# ============================================================================

@app.route('/api/experiences')
def api_experiences():
    """API endpoint to get experiences (JSON)"""
    category = request.args.get('category')
    location = request.args.get('location')
    search = request.args.get('search')
    
    filtered = filter_experiences(
        category=category,
        location=location,
        search_query=search
    )
    
    return jsonify({
        'success': True,
        'count': len(filtered),
        'experiences': filtered
    })

@app.route('/api/experience/<int:experience_id>')
def api_experience_detail(experience_id):
    """API endpoint to get single experience"""
    experience = get_experience_by_id(experience_id)
    
    if not experience:
        return jsonify({
            'success': False,
            'error': 'Experience not found'
        }), 404
    
    return jsonify({
        'success': True,
        'experience': experience
    })

@app.route('/api/categories')
def api_categories():
    """API endpoint to get all categories with stats"""
    stats = get_category_stats()
    categories_list = []
    
    for cat_id, cat_info in app.config['CATEGORIES'].items():
        categories_list.append({
            'id': cat_id,
            'name': cat_info['name'],
            'icon': cat_info['icon'],
            'color': cat_info['color'],
            'count': stats.get(cat_id, 0)
        })
    
    return jsonify({
        'success': True,
        'categories': categories_list
    })

@app.route('/api/search/suggestions')
def api_search_suggestions():
    """API endpoint for search autocomplete"""
    query = request.args.get('q', '').lower()
    
    if len(query) < 2:
        return jsonify({'suggestions': []})
    
    suggestions = []
    
    # Search in titles
    for exp in EXPERIENCES:
        title = exp.get('title', '')
        if query in title.lower() and title not in suggestions:
            suggestions.append(title)
    
    # Limit to 5 suggestions
    return jsonify({'suggestions': suggestions[:5]})

# ============================================================================
# DEMO BOOKING FLOW (Simplified)
# ============================================================================

@app.route('/api/booking/check-availability', methods=['POST'])
def check_availability():
    """Check if experience is available on selected date"""
    data = request.get_json()
    experience_id = data.get('experience_id')
    date = data.get('date')
    guests = data.get('guests', 1)
    
    experience = get_experience_by_id(experience_id)
    
    if not experience:
        return jsonify({
            'success': False,
            'error': 'Experience not found'
        }), 404
    
    # In demo, always return available
    # In production, check actual availability from database
    return jsonify({
        'success': True,
        'available': True,
        'message': 'Experience is available for selected date',
        'price': experience.get('price', 0),
        'total': experience.get('price', 0) * guests
    })

@app.route('/api/booking/create', methods=['POST'])
def create_booking():
    """Create a new booking (demo only - doesn't save)"""
    data = request.get_json()
    
    # In production, this would:
    # 1. Validate data
    # 2. Process payment via Stripe
    # 3. Save booking to database
    # 4. Send confirmation emails
    # 5. Notify provider
    
    return jsonify({
        'success': True,
        'booking_id': 9999,
        'message': 'Booking created successfully! (Demo mode)',
        'confirmation_code': 'MAYAGO-DEMO-' + str(datetime.now().timestamp())[-6:]
    })

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('demo.html', error_404=True), 404

@app.errorhandler(500)
def internal_server_error(e):
    """Handle 500 errors"""
    return render_template('demo.html', error_500=True), 500

# ============================================================================
# CONTEXT PROCESSORS (Make variables available to all templates)
# ============================================================================

@app.context_processor
def inject_globals():
    """Inject global variables into all templates"""
    return {
        'app_name': app.config['APP_NAME'],
        'app_version': app.config['APP_VERSION'],
        'current_year': datetime.now().year,
        'contact_email': app.config['CONTACT_EMAIL'],
        'social_media': app.config['SOCIAL_MEDIA']
    }

# ============================================================================
# RUN APPLICATION
# ============================================================================

if __name__ == '__main__':
    print("=" * 60)
    print(f"🗿 {app.config['APP_NAME']} - {app.config['APP_DESCRIPTION']}")
    print("=" * 60)
    print(f"📊 Loaded {len(EXPERIENCES)} experiences")
    print(f"👥 Loaded {len(USERS)} users")
    print(f"📅 Loaded {len(BOOKINGS)} bookings")
    print("=" * 60)
    print("🌐 Presentation: http://localhost:5000/")
    print("🎮 Demo App:     http://localhost:5000/demo")
    print("=" * 60)
    print("Press CTRL+C to stop the server")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)