// Deklaracja typów dla biblioteki Leaflet
declare namespace L {
    function map(id: string): any;
    function tileLayer(url: string, options?: any): any;
    function marker(latlng: [number, number]): any;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('VRealm Profile loaded');
    
    // Smooth scrolling for navigation links
    implementSmoothScrolling();
    
    // Implement parallax effect on header
    implementParallaxEffect();
    
    // Highlight active navigation based on scroll position
    implementScrollSpy();
    
    // Add animation to cards on scroll
    implementScrollAnimations();
    
    // Add hover effects for VR elements
    implementHoverEffects();
    
    // Track booking button clicks
    trackBookingButtonClicks();
    
    // Initialize OpenStreetMap
    initOpenStreetMap();
});

function implementSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '';
            
            if (targetId && targetId.indexOf('#') === 0) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, '', targetId);
                    
                    // Update active state in navigation
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    (e.currentTarget as HTMLElement).classList.add('active');
                }
            }
        });
    });
}

function implementParallaxEffect(): void {
    const header = document.querySelector('.vr-header') as HTMLElement;
    
    window.addEventListener('scroll', () => {
        if (header) {
            const scrollPosition = window.pageYOffset;
            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

function implementScrollSpy(): void {
    const sections = document.querySelectorAll('.vr-section, .vr-header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionElement = section as HTMLElement;
            const sectionTop = sectionElement.offsetTop - 100;
            const sectionHeight = sectionElement.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = sectionElement.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function implementScrollAnimations(): void {
    // Initialize animation for elements when they come into view
    const animatedElements = document.querySelectorAll('.card, .about-content, .contact-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        // Remove default animation to control via JS
        element.classList.remove('fadeIn');
        observer.observe(element);
    });
    
    // Add CSS for fade-in animation if not already defined
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

function implementHoverEffects(): void {
    // Add 3D tilt effect to cards on hover
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const cardElement = card as HTMLElement;
            const rect = cardElement.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            cardElement.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const cardElement = card as HTMLElement;
            cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            cardElement.style.transition = 'transform 0.5s ease';
        });
    });
}

function trackBookingButtonClicks(): void {
    const bookingButtons = document.querySelectorAll('#booking-btn, #booking-btn-footer');
    
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Booking button clicked - redirecting to booksy.pl');
            
            // Optional: Add fancy transition effect before redirect
            const btnElement = e.currentTarget as HTMLElement;
            btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Przekierowuję...';
            
            // You could add analytics tracking here in a real application
            
            // Redirect happens via the href attribute in the anchor tag
        });
    });
}

// Add mobile navigation toggle functionality for responsive design
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu button
    const nav = document.querySelector('.vr-nav') as HTMLElement;
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(mobileMenuBtn);
    
    // Add menu toggle functionality
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle between hamburger and close icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1001;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background: rgba(18, 18, 18, 0.95);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                transition: right 0.3s ease;
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Inicjalizacja mapy OpenStreetMap z biblioteką Leaflet
function initOpenStreetMap(): void {
    if (typeof L !== 'undefined') {
        // Współrzędne lokalizacji MoveVR
        const moveVrLocation: [number, number] = [52.3324863, 21.1256934];
        
        // Inicjalizacja mapy (podstawiamy div o id="map")
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const map = L.map('map').setView(moveVrLocation, 15);
            
            // Dodanie warstwy kafelków OpenStreetMap
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Dodanie znacznika na mapie
            const marker = L.marker(moveVrLocation).addTo(map);
            
            // Dodanie okienka informacyjnego po kliknięciu na znacznik
            marker.bindPopup("<b>MoveVR</b><br>Twój portal do wirtualnej rzeczywistości").openPopup();
        }
    } else {
        console.error('Biblioteka Leaflet nie została załadowana.');
    }
}