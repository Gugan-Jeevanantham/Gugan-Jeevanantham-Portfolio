// ===== PAGE REFRESH FIX =====
document.addEventListener('DOMContentLoaded', function() {
    // Always show home on refresh
    if (window.location.hash) {
        window.history.replaceState(null, null, ' ');
    }
    
    // Set home as active initially
    setActiveNavLink('home');
    
    // Initialize everything
    initializeAll();
    
    // Auto-scroll to home after load
    setTimeout(() => {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

// ===== EMAILJS INITIALIZATION (Do this FIRST) =====
(function initializeEmailJS() {
    // Only initialize if EmailJS is available AND we have a public key
    if (typeof emailjs !== 'undefined') {
        // REPLACE WITH YOUR ACTUAL PUBLIC KEY from EmailJS dashboard
        const publicKey = "YOUR_PUBLIC_KEY_HERE";
        if (publicKey && publicKey !== "YOUR_PUBLIC_KEY_HERE") {
            emailjs.init(publicKey);
            console.log("EmailJS initialized successfully");
        } else {
            console.warn("Please add your EmailJS Public Key to send real emails");
        }
    }
})();

// ===== INITIALIZE ALL =====
function initializeAll() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeHeroAnimations();
    initializeSkillsAnimation();
    initializeTimelineAnimation();
    initializeProjects();
    initializeContactForm();
    initializeBackToTop();
    initializeAOS();
    initializeCounters();
    initializeEnhancedAnimations();
    initializeMatrixBackground();
    initializeTypingEffect();
    initializeGlitchEffect();
    initializePageRefresh();
}

// ===== PAGE REFRESH HANDLER =====
function initializePageRefresh() {
    // Store current state
    const pageState = {
        currentSection: 'home',
        theme: localStorage.getItem('portfolio-theme') || 'dark'
    };
    
    // Set active section on refresh
    window.addEventListener('load', function() {
        setTimeout(() => {
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }, 500);
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        if (!window.location.hash || window.location.hash === '#home') {
            setActiveNavLink('home');
        }
    });
}

// ===== ENHANCED ANIMATIONS =====
function initializeEnhancedAnimations() {
    // Add hover animations to all interactive elements
    const interactiveElements = document.querySelectorAll(
        '.skill-category-card, .project-card, .info-card, .cta-btn, .project-btn, .view-more-btn, .social-link, .tag, .tech-tag, .cloud-item'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-primary)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.animation = 'morphShape 3s ease-in-out infinite, neonPulse 2s infinite';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.animation = 'morphShape 8s ease-in-out infinite';
        });
    }
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('button, .cta-btn, .project-btn, .view-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createParticleExplosion(e, this);
        });
    });
}

// ===== MATRIX BACKGROUND =====
function initializeMatrixBackground() {
    const bgDots = document.querySelector('.bg-dots');
    if (!bgDots) return;
    
    // Clear existing content
    bgDots.innerHTML = '';
    
    // Create matrix rain effect
    function createMatrixChar() {
        const char = document.createElement('span');
        char.textContent = String.fromCharCode(33 + Math.random() * 94);
        char.style.position = 'absolute';
        char.style.color = `rgba(${Math.random() * 100}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.5})`;
        char.style.fontSize = Math.random() * 20 + 10 + 'px';
        char.style.left = Math.random() * 100 + '%';
        char.style.top = '-50px';
        char.style.animation = `matrixRain ${Math.random() * 5 + 5}s linear forwards`;
        char.style.animationDelay = Math.random() * 5 + 's';
        char.style.zIndex = '-1';
        char.style.pointerEvents = 'none';
        char.style.userSelect = 'none';
        
        bgDots.appendChild(char);
        
        // Remove after animation
        setTimeout(() => {
            if (char.parentNode === bgDots) {
                char.remove();
            }
        }, 10000);
    }
    
    // Create initial characters
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createMatrixChar(), i * 100);
    }
    
    // Continue creating characters
    setInterval(createMatrixChar, 200);
}

// ===== PARTICLE EXPLOSION =====
function createParticleExplosion(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = getRandomGradient();
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = `particleExplosion 0.6s ease-out forwards`;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode === element) {
                particle.remove();
            }
        }, 600);
    }
}

function getRandomGradient() {
    const gradients = [
        'linear-gradient(45deg, #ff2c64, #00d4ff)',
        'linear-gradient(45deg, #00d4ff, #9d4edd)',
        'linear-gradient(45deg, #9d4edd, #ff2c64)',
        'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const roleElement = document.querySelector('.hero-subtitle');
    if (!roleElement) return;
    
    const roles = [
        'Software Engineer',
        'Frontend Developer',
        'ERP Specialist',
        'Web Developer'
    ];
    
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        if (isPaused) return;
        
        const currentText = roles[currentRoleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                setTimeout(typeWriter, 1000);
            }, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeWriter, 500);
            return;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing after page loads
    setTimeout(typeWriter, 1500);
}

// ===== GLITCH EFFECT =====
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.highlight, .section-title .highlight');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitchEffect 0.3s';
            this.style.color = getRandomColor();
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = '';
            this.style.color = '';
        });
    });
}

function getRandomColor() {
    const colors = [
        '#ff2c64',
        '#00d4ff',
        '#9d4edd',
        '#ff6b6b',
        '#4ecdc4',
        '#f7df1e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    document.body.style.overflow = 'hidden';
    
    let progress = 0;
    const targetProgress = 100;
    const duration = 2500;
    const startTime = Date.now();
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progressPercent, 3);
        progress = Math.floor(easeOutCubic * targetProgress);
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${progress}%`;
        
        if (progressPercent < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    
                    // Trigger initial animations
                    triggerInitialAnimations();
                }, 800);
            }, 500);
        }
    }
    
    requestAnimationFrame(updateProgress);
}

// ===== THEME TOGGLE =====
// Minimal theme toggle - guaranteed to work
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Set initial theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    updateThemeButton();
    
    // Single event listener
    themeToggle.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-mode');
        
        if (isLight) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('portfolio-theme', 'light');
        }
        
        updateThemeButton();
    });
    
    function updateThemeButton() {
        const isLight = document.body.classList.contains('light-mode');
        if (themeText) {
            themeText.textContent = isLight ? 'Light Mode' : 'Dark Mode';
        }
    }
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.portfolio-nav');
    if (!navbar) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 100;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update current section
                setActiveNavLink(targetId.substring(1));
                
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const toggle = document.querySelector('.navbar-toggler');
                    if (toggle) toggle.click();
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveNavLink(sectionId);
        }
    });
}

function setActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    // Remove hover from hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.cursor = 'default';
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        heroTitle.addEventListener('mouseleave', function() {
            this.style.animation = 'bounceIn3D 1s ease-out';
        });
    }
    
    // Animate floating elements
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-count'));
        setTimeout(() => {
            animateCounter(stat, target);
        }, 1000 + (index * 300));
    });
}

// ===== SKILLS ANIMATION =====
function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-level');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                setTimeout(() => {
                    skillBar.style.width = `${level}%`;
                    skillBar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    const percentElement = skillBar.parentElement.nextElementSibling;
                    if (percentElement && percentElement.classList.contains('skill-percent')) {
                        animateCounter(percentElement, parseInt(level));
                    }
                }, index * 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== TIMELINE ANIMATION =====
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) rotateX(-90deg)';
        observer.observe(item);
    });
}

// ===== PROJECTS =====
function initializeProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length === 0) return;
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) rotateY(-90deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotateY(0)';
        }, 500 + (index * 150));
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;
        
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                group.classList.remove('focused');
            }
        });
        
        if (input.value) {
            group.classList.add('focused');
        }
    });

    document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

        const sendForm = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject")?.value.trim() || "Portfolio Inquiry",
            message: document.getElementById("message").value.trim()
        };
            
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) 
        {
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');

            if (btnText && btnIcon) 
            {
                const originalText = btnText.textContent;
                const originalIcon = btnIcon.className;

                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                submitBtn.disabled = true;

                const resetButton = () => {
                    btnText.textContent = originalText;
                    btnIcon.className = originalIcon;
                    submitBtn.disabled = false;
                };

                // 📩 Send email to admin (you)
                emailjs.send("service_5a4soop", "template_h0rsfmd", sendForm)
                .then(() => {
                    console.log("✅ Message sent to admin");

                    // 📩 Send acknowledgement to user
                    return emailjs.send("service_5a4soop", "template_f558mlf", sendForm);
                })
                .then(() => {
                    showNotification('✅ Your message was sent successfully!', 'success');
                    document.getElementById("contactForm").reset();
                    resetButton();
                })
                .catch((error) => {
                    showNotification('❌ Failed to send message. Please try again.', 'error');
                    document.getElementById("contactForm").reset();
                    resetButton();
                });
            }
        }
    });
}


// ===== BACK TO TOP =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (parseFloat(getComputedStyle(backToTopBtn).opacity) === 0) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        this.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

// ===== AOS =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true,
            easing: 'ease-out-cubic',
            disable: window.innerWidth < 768
        });
    }
}

// ===== COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
    });
}

// ===== INITIAL ANIMATIONS =====
function triggerInitialAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px) rotateX(-10deg)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0) rotateX(0)';
        }, index * 200);
    });
}

// ===== UTILITY FUNCTIONS =====
function animateCounter(element, target) {
    if (!element || isNaN(target)) return;
    
    let current = 0;
    const increment = target / 50;
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 30);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== MODAL FUNCTIONS =====
function openModal(title, description, link) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    
    if (!modal || !modalTitle || !modalDesc) return;
    
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    
    if (modalLink && link) {
        modalLink.href = link;
        modalLink.style.display = 'inline-block';
    } else if (modalLink) {
        modalLink.style.display = 'none';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'visible';
    }, 300);
}

// Add modal event listeners
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

const modalOverlay = document.querySelector('.modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

const modalCloseBtn = document.querySelector('.modal-close');
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

// ===== WINDOW RESIZE =====
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Remove duplicate window.load listener
// The initialization is already handled in DOMContentLoaded