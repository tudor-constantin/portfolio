// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        this.navToggle?.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    toggleMenu() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-target]');
        this.observed = false;
        
        this.init();
    }
    
    init() {
        if (this.counters.length > 0) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.observed) {
                        this.observed = true;
                        this.animateCounters();
                    }
                });
            });
            
            this.counters.forEach(counter => {
                this.observer.observe(counter);
            });
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = '+' + Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = '+' + target;
                }
            };
            
            updateCounter();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new CounterAnimation();
});