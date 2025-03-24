document.addEventListener('DOMContentLoaded', function () {
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
function implementSmoothScrolling() {
    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = e.currentTarget.getAttribute('href') || '';
            if (targetId && targetId.indexOf('#') === 0) {
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
                        behavior: 'smooth'
                    });
                    // Update URL without page reload
                    history.pushState(null, '', targetId);
                    // Update active state in navigation
                    navLinks.forEach(function (navLink) { return navLink.classList.remove('active'); });
                    e.currentTarget.classList.add('active');
                }
            }
        });
    });
}
function implementParallaxEffect() {
    var header = document.querySelector('.vr-header');
    window.addEventListener('scroll', function () {
        if (header) {
            var scrollPosition = window.pageYOffset;
            header.style.backgroundPositionY = "".concat(scrollPosition * 0.5, "px");
        }
    });
}
function implementScrollSpy() {
    var sections = document.querySelectorAll('.vr-section, .vr-header');
    var navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', function () {
        var current = '';
        sections.forEach(function (section) {
            var sectionElement = section;
            var sectionTop = sectionElement.offsetTop - 100;
            var sectionHeight = sectionElement.clientHeight;
            if (window.pageYOffset >= sectionTop) {
                current = sectionElement.getAttribute('id') || '';
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
function implementScrollAnimations() {
    // Initialize animation for elements when they come into view
    var animatedElements = document.querySelectorAll('.card, .about-content, .contact-container');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(function (element) {
        // Remove default animation to control via JS
        element.classList.remove('fadeIn');
        observer.observe(element);
    });
    // Add CSS for fade-in animation if not already defined
    var style = document.createElement('style');
    style.textContent = "\n        .fade-in {\n            animation: fadeIn 1s ease forwards;\n        }\n    ";
    document.head.appendChild(style);
}
function implementHoverEffects() {
    // Add 3D tilt effect to cards on hover
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var mouseEvent = e;
            var cardElement = card;
            var rect = cardElement.getBoundingClientRect();
            var x = mouseEvent.clientX - rect.left;
            var y = mouseEvent.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var angleX = (y - centerY) / 10;
            var angleY = (centerX - x) / 10;
            cardElement.style.transform = "perspective(1000px) rotateX(".concat(angleX, "deg) rotateY(").concat(angleY, "deg) translateZ(10px)");
        });
        card.addEventListener('mouseleave', function () {
            var cardElement = card;
            cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            cardElement.style.transition = 'transform 0.5s ease';
        });
    });
}
function trackBookingButtonClicks() {
    var bookingButtons = document.querySelectorAll('#booking-btn, #booking-btn-footer');
    bookingButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            console.log('Booking button clicked - redirecting to booksy.pl');
            // Optional: Add fancy transition effect before redirect
            var btnElement = e.currentTarget;
            btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Przekierowuję...';
            // You could add analytics tracking here in a real application
            // Redirect happens via the href attribute in the anchor tag
        });
    });
}
// Add mobile navigation toggle functionality for responsive design
document.addEventListener('DOMContentLoaded', function () {
    // Create mobile menu button
    var nav = document.querySelector('.vr-nav');
    var mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(mobileMenuBtn);
    // Add menu toggle functionality
    var navLinks = document.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        // Toggle between hamburger and close icon
        var icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
            else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    // Add mobile menu styles
    var style = document.createElement('style');
    style.textContent = "\n        .mobile-menu-btn {\n            display: none;\n            background: none;\n            border: none;\n            color: white;\n            font-size: 1.5rem;\n            cursor: pointer;\n            z-index: 1001;\n        }\n        \n        @media (max-width: 768px) {\n            .mobile-menu-btn {\n                display: block;\n            }\n            \n            .nav-links {\n                position: fixed;\n                top: 0;\n                right: -100%;\n                width: 80%;\n                max-width: 300px;\n                height: 100vh;\n                background: rgba(18, 18, 18, 0.95);\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 1000;\n                transition: right 0.3s ease;\n            }\n            \n            .nav-links.active {\n                right: 0;\n            }\n            \n            .nav-links li {\n                margin: 1rem 0;\n            }\n        }\n    ";
    document.head.appendChild(style);
});
// Inicjalizacja mapy OpenStreetMap z biblioteką Leaflet
function initOpenStreetMap() {
    if (typeof L !== 'undefined') {
        // Współrzędne lokalizacji MoveVR
        var moveVrLocation = [52.3324863, 21.1256934];
        // Inicjalizacja mapy (podstawiamy div o id="map")
        var mapElement = document.getElementById('map');
        if (mapElement) {
            var map = L.map('map').setView(moveVrLocation, 15);
            // Dodanie warstwy kafelków OpenStreetMap
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            // Dodanie znacznika na mapie
            var marker = L.marker(moveVrLocation).addTo(map);
            // Dodanie okienka informacyjnego po kliknięciu na znacznik
            marker.bindPopup("<b>MoveVR</b><br>Twój portal do wirtualnej rzeczywistości").openPopup();
        }
    }
    else {
        console.error('Biblioteka Leaflet nie została załadowana.');
    }
}
