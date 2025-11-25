/**
 * MayaGo - Presentation Page JavaScript
 * Handles animations, interactions, and effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
});

/**
 * Initialize entrance animations
 */
function initializeAnimations() {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
    
    // Add CSS for animate-in
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animated counters for statistics
 */
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200; // Animation speed
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent.replace(/[^0-9.]/g, '');
                const isDecimal = target.includes('.');
                const targetNum = parseFloat(target);
                
                animateCounter(counter, 0, targetNum, speed, isDecimal);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate a counter from start to target
 */
function animateCounter(element, start, target, duration, isDecimal = false) {
    const increment = target / (duration / 16); // 60fps
    let current = start;
    const suffix = element.textContent.replace(/[0-9.]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

/**
 * Initialize scroll-based effects
 */
function initializeScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && currentScroll < window.innerHeight) {
            heroBackground.style.transform = `translateY(${currentScroll * 0.5}px)`;
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Add hover effects to experience cards
 */
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

/**
 * Category card hover effects
 */
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.category-icon i');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.category-icon i');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

/**
 * Add shimmer effect to buttons
 */
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (!this.querySelector('.shimmer')) {
            const shimmer = document.createElement('span');
            shimmer.className = 'shimmer';
            shimmer.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 0.6s;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(shimmer);
            
            setTimeout(() => shimmer.remove(), 600);
        }
    });
});

// Add shimmer animation
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(shimmerStyle);

/**
 * Handle video modal (if video button is clicked)
 */
document.querySelectorAll('a[href*="video"], a[href*="watch"]').forEach(link => {
    if (link.textContent.toLowerCase().includes('video') || 
        link.querySelector('.ti-play')) {
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showVideoModal();
        });
    }
});

function showVideoModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        max-width: 800px;
        width: 90%;
        text-align: center;
    `;
    
    content.innerHTML = `
        <h2 style="margin-bottom: var(--spacing-md); color: var(--color-text);">
            🎥 How MayaGo Works
        </h2>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
            Demo Mode: In production, this would show a video explaining the platform.
        </p>
        <button class="btn btn-primary" onclick="this.closest('[style*=fixed]').remove()">
            Close
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

/**
 * Log performance metrics (development only)
 */
if (window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        console.log('🗿 MayaGo Presentation Loaded');
        
        if (window.performance) {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page load time: ${loadTime}ms`);
        }
    });
}