// ===== MOBILE SLIDE ANIMATIONS FOR WIDER CARDS =====
function initMobileWiderCardAnimations() {
    // Check if mobile
    const isMobile = window.innerWidth <= 992;
    
    if (!isMobile) {
        // Remove mobile classes if on desktop
        document.querySelectorAll('.slide-visible').forEach(el => {
            el.classList.remove('slide-visible');
        });
        return;
    }
    
    // Elements to animate
    const elements = [
        ...document.querySelectorAll('.skill-category-card'),
        ...document.querySelectorAll('.timeline-content'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.side-project'),
        ...document.querySelectorAll('.info-card'),
        ...document.querySelectorAll('.contact-form-wrapper'),
        ...document.querySelectorAll('.cloud-item'),
        ...document.querySelectorAll('.social-link'),
        ...document.querySelectorAll('.hero-text-wrapper'),
        ...document.querySelectorAll('.profile-image')
    ];
    
    function checkElementVisibility() {
        elements.forEach(el => {
            if (!el) return;
            
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.8;
            
            // Check if element is in viewport
            if (rect.top < triggerPoint && rect.bottom > 0) {
                if (!el.classList.contains('slide-visible')) {
                    el.classList.add('slide-visible');
                    
                    // Add subtle scale animation for Database/Tools card
                    if (el.classList.contains('skill-category-card') && 
                        el.parentElement && 
                        el.parentElement.children[2] === el) {
                        setTimeout(() => {
                            el.style.transform = 'scale(1.02)';
                            setTimeout(() => {
                                el.style.transform = 'scale(1)';
                            }, 300);
                        }, 100);
                    }
                }
            }
        });
    }
    
    // Initial check
    checkElementVisibility();
    
    // Check on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkElementVisibility, 50);
    });
    
    // Check on resize
    window.addEventListener('resize', checkElementVisibility);
    
    // Auto animate hero section with delay
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text-wrapper');
        const heroImage = document.querySelector('.profile-image');
        
        if (heroText) {
            heroText.classList.add('slide-visible');
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heroText.style.transition = 'all 0.8s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroImage) {
            heroImage.classList.add('slide-visible');
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateY(20px) scale(0.95)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 0.8s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }
    }, 500);
}

// Initialize
window.addEventListener('load', initMobileWiderCardAnimations);
window.addEventListener('resize', function() {
    setTimeout(initMobileWiderCardAnimations, 150);
});

// Disable AOS on mobile
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 992 && typeof AOS !== 'undefined') {
        AOS.init({ disable: true });
    } else if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});