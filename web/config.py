"""
MayaGo - Configuration File
Flask application configuration settings
"""

import os
from pathlib import Path

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

class Config:
    """Base configuration class"""
    
    # Flask Settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = True
    TESTING = False
    
    # Application Settings
    APP_NAME = 'MayaGo'
    APP_VERSION = '1.0.0'
    APP_DESCRIPTION = 'Authentic Mayan Experiences Platform'
    
    # Data Files Paths
    DATA_DIR = BASE_DIR / 'data'
    EXPERIENCES_FILE = DATA_DIR / 'experiences.json'
    USERS_FILE = DATA_DIR / 'users.json'
    BOOKINGS_FILE = DATA_DIR / 'bookings.json'
    
    # Static Files
    STATIC_FOLDER = 'static'
    TEMPLATE_FOLDER = 'templates'
    
    # Pagination
    EXPERIENCES_PER_PAGE = 12
    BOOKINGS_PER_PAGE = 10
    
    # Currency Settings
    DEFAULT_CURRENCY = 'USD'
    SUPPORTED_CURRENCIES = ['USD', 'MXN', 'EUR', 'CAD']
    
    # Platform Commission
    COMMISSION_RATE = 0.15  # 15%
    
    # Contact Information
    CONTACT_EMAIL = 'hello@mayago.com'
    SUPPORT_EMAIL = 'support@mayago.com'
    
    # Social Media (for demo)
    SOCIAL_MEDIA = {
        'instagram': 'https://instagram.com/mayago',
        'facebook': 'https://facebook.com/mayago',
        'twitter': 'https://twitter.com/mayago'
    }
    
    # Google Maps API (Demo - would be real in production)
    GOOGLE_MAPS_API_KEY = 'demo-api-key'
    
    # Stripe Configuration (Demo mode)
    STRIPE_PUBLISHABLE_KEY = 'pk_test_demo_key'
    STRIPE_SECRET_KEY = 'sk_test_demo_key'
    
    # Email Configuration (would be real in production)
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    
    # Categories
    CATEGORIES = {
        'food': {
            'name': 'Food & Cooking',
            'icon': 'chef-hat',
            'color': '#FF6B6B'
        },
        'adventure': {
            'name': 'Adventure & Nature',
            'icon': 'mountain',
            'color': '#4ECDC4'
        },
        'culture': {
            'name': 'Culture & Traditions',
            'icon': 'building-monument',
            'color': '#95E1D3'
        },
        'nature': {
            'name': 'Nature & Wildlife',
            'icon': 'leaf',
            'color': '#38A169'
        }
    }
    
    # Experience Tags
    POPULAR_TAGS = [
        'authentic',
        'traditional',
        'hands-on',
        'family-friendly',
        'small-group',
        'expert-led',
        'food',
        'adventure',
        'cultural',
        'nature'
    ]
    
    # Price Ranges (in USD)
    PRICE_RANGES = [
        {'label': 'Under $50', 'min': 0, 'max': 50},
        {'label': '$50 - $75', 'min': 50, 'max': 75},
        {'label': '$75 - $100', 'min': 75, 'max': 100},
        {'label': 'Over $100', 'min': 100, 'max': 9999}
    ]
    
    # Duration Options (in minutes)
    DURATION_OPTIONS = [
        {'label': 'Under 2 hours', 'min': 0, 'max': 120},
        {'label': '2-4 hours', 'min': 120, 'max': 240},
        {'label': '4-6 hours', 'min': 240, 'max': 360},
        {'label': 'Full day (6+ hours)', 'min': 360, 'max': 9999}
    ]
    
    # Locations
    LOCATIONS = [
        'Mérida',
        'Uxmal',
        'Celestún',
        'Maní',
        'Homún',
        'Tixkokob',
        'Valladolid',
        'Izamal'
    ]

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    # In production, SECRET_KEY must be set via environment variable
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config(config_name='default'):
    """Get configuration by name"""
    return config.get(config_name, DevelopmentConfig)