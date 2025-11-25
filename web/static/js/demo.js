/**
 * MayaGo - Demo Application JavaScript
 * Handles filtering, booking, and interactive features
 */

// State management
const AppState = {
    experiences: [],
    filters: {
        category: 'all',
        location: 'all',
        minPrice: null,
        maxPrice: null,
        search: ''
    },
    currentPage: 1,
    itemsPerPage: 12
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeSearch();
    initializeBookingFlow();
    addCardAnimations();
    
    console.log('🎮 MayaGo Demo Initialized');
});

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            // Store filter value
            const filterType = e.target.name;
            AppState.filters[filterType] = e.target.value;
            
            // Show loading state
            showLoadingState();
            
            // Simulate API call delay (in production this would be real)
            setTimeout(() => {
                // In production, this would make an actual API call
                // applyFilters();
                hideLoadingState();
            }, 300);
        });
    });
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            // Debounce search
            searchTimeout = setTimeout(() => {
                AppState.filters.search = e.target.value;
                console.log('🔍 Searching for:', e.target.value);
                
                // In production, make API call here
                // searchExperiences(e.target.value);
            }, 500);
        });
        
        // Add search icon animation
        const searchIcon = searchInput.previousElementSibling;
        searchInput.addEventListener('focus', () => {
            if (searchIcon) {
                searchIcon.style.color = 'var(--color-accent)';
                searchIcon.style.transform = 'scale(1.1)';
            }
        });
        
        searchInput.addEventListener('blur', () => {
            if (searchIcon) {
                searchIcon.style.color = '';
                searchIcon.style.transform = '';
            }
        });
    }
}

/**
 * Initialize booking flow
 */
function initializeBookingFlow() {
    const bookingButtons = document.querySelectorAll('[data-book-experience]');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const experienceId = button.dataset.bookExperience;
            showBookingModal(experienceId);
        });
    });
}

/**
 * Show booking modal
 */
function showBookingModal(experienceId) {
    // Create modal overlay
    const modal = createModal();
    
    const modalContent = `
        <div class="booking-modal">
            <div class="modal-header">
                <h2>📅 Book Your Experience</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="ti ti-x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="booking-step" data-step="1">
                    <h3>Select Date & Guests</h3>
                    
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-input" id="bookingDate" 
                               min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="form-group">
                        <label>Number of Guests</label>
                        <select class="form-input" id="numGuests">
                            <option value="1">1 guest</option>
                            <option value="2">2 guests</option>
                            <option value="3">3 guests</option>
                            <option value="4">4 guests</option>
                            <option value="5">5+ guests</option>
                        </select>
                    </div>
                    
                    <button class="btn btn-primary btn-block" onclick="checkAvailability()">
                        Check Availability
                    </button>
                </div>
                
                <div class="demo-notice">
                    <i class="ti ti-info-circle"></i>
                    <p><strong>Demo Mode:</strong> This is a demonstration of the booking flow. 
                    In production, this would connect to a real payment gateway and booking system.</p>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Create modal element
 */
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay.active { opacity: 1; }
        
        .booking-modal {
            background: var(--color-bg-secondary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-lg);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-header h2 {
            margin: 0;
            color: var(--color-text);
            font-size: 1.5rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--color-text);
            font-size: 1.5rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-body {
            padding: var(--spacing-lg);
        }
        
        .form-group {
            margin-bottom: var(--spacing-md);
        }
        
        .form-group label {
            display: block;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text);
            font-weight: 600;
        }
        
        .form-input {
            width: 100%;
            padding: 0.75rem;
            background: var(--color-bg-tertiary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-sm);
            color: var(--color-text);
            font-size: 1rem;
            transition: border-color 0.2s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--color-accent);
        }
        
        .demo-notice {
            margin-top: var(--spacing-lg);
            padding: var(--spacing-md);
            background: rgba(0, 217, 255, 0.1);
            border: 1px solid rgba(0, 217, 255, 0.3);
            border-radius: var(--radius-sm);
            display: flex;
            gap: var(--spacing-sm);
            align-items: flex-start;
        }
        
        .demo-notice i {
            color: var(--color-accent);
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .demo-notice p {
            color: var(--color-text-secondary);
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    return modal;
}

/**
 * Check availability (demo function)
 */
window.checkAvailability = function() {
    const date = document.getElementById('bookingDate')?.value;
    const guests = document.getElementById('numGuests')?.value;
    
    if (!date) {
        showNotification('Please select a date', 'warning');
        return;
    }
    
    showNotification('✅ Experience available! Proceeding to payment...', 'success');
    
    setTimeout(() => {
        document.querySelector('.modal-overlay')?.remove();
        showNotification('🎉 Demo complete! In production, this would process payment.', 'info');
    }, 2000);
};

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--color-success)' : 
                     type === 'warning' ? 'var(--color-warning)' : 
                     type === 'error' ? 'var(--color-error)' : 
                     'var(--color-accent)'};
        color: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notifStyle);

/**
 * Add card animations
 */
function addCardAnimations() {
    const cards = document.querySelectorAll('.experience-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

/**
 * Show loading state
 */
function showLoadingState() {
    const container = document.querySelector('.experiences-container');
    if (container) {
        container.style.opacity = '0.5';
        container.style.pointerEvents = 'none';
    }
}

/**
 * Hide loading state
 */
function hideLoadingState() {
    const container = document.querySelector('.experiences-container');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}

/**
 * Lazy load images
 */
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

/**
 * Handle favorite/wishlist (demo)
 */
window.toggleFavorite = function(experienceId) {
    const icon = event.target.closest('button')?.querySelector('i');
    if (icon) {
        if (icon.classList.contains('ti-heart')) {
            icon.classList.remove('ti-heart');
            icon.classList.add('ti-heart-filled');
            icon.style.color = 'var(--color-error)';
            showNotification('Added to favorites!', 'success');
        } else {
            icon.classList.remove('ti-heart-filled');
            icon.classList.add('ti-heart');
            icon.style.color = '';
            showNotification('Removed from favorites', 'info');
        }
    }
};

/**
 * Share experience (demo)
 */
window.shareExperience = function(experienceId, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this amazing experience on MayaGo!',
            url: window.location.href
        }).catch(() => {
            copyToClipboard(window.location.href);
        });
    } else {
        copyToClipboard(window.location.href);
    }
};

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    });
}

// Log demo ready
console.log('🎮 Demo features initialized');
console.log('💡 Tip: Try the filters and booking flow!');