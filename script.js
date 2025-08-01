// Smooth scrolling for all links
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to link cards
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you would typically navigate to the actual link
            // For now, we'll just show a console message
            const linkText = this.querySelector('.link-text').textContent;
            console.log(`Clicked on: ${linkText}`);
        });
    });

    // Add hover effects for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add click events for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // For demo purposes, prevent default and show message
            if (this.classList.contains('phone')) {
                // Phone link will work normally
                return;
            }
            
            e.preventDefault();
            const buttonText = this.querySelector('span').textContent;
            console.log(`Clicked: ${buttonText}`);
        });
    });

    // Add smooth reveal animation on page load
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for smooth reveal
    const sections = document.querySelectorAll('.profile-section, .links-section, .cta-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Add focus styles for accessibility
            const focusableElements = document.querySelectorAll('a, button, .link-card');
            focusableElements.forEach(el => {
                el.addEventListener('focus', function() {
                    this.style.outline = '2px solid #007AFF';
                    this.style.outlineOffset = '2px';
                });
                
                el.addEventListener('blur', function() {
                    this.style.outline = '';
                });
            });
        }
    });

    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        linkCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations if needed
        }, 16);
    });

    // Add meta theme color for mobile browsers
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#e3f2fd';
    document.head.appendChild(metaThemeColor);
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
} 