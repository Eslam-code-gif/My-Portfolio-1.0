document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // ==== 1. Custom Mouse Cursor ====
    // ===================================
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline with a delay for a smoother effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });


    // ===================================
    // ==== 2. Typing Effect (Homepage) ====
    // ===================================
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textToType = "Abdelrahim Mohamed";
        let charIndex = 0;
        
        function type() {
            if (charIndex < textToType.length) {
                typedTextSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 120);
            }
        }
        setTimeout(type, 500);
    }


    // ===================================
    // ==== 3. Staggered & Scroll Animation ====
    // ===================================
    const animatedItems = document.querySelectorAll('.section, .skill-item, .project-card');
    
    if (animatedItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Staggered delay logic
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedItems.forEach((item, index) => {
             // Apply a staggered delay for cards
            if (item.classList.contains('skill-item') || item.classList.contains('project-card')) {
                item.style.transitionDelay = `${index * 100}ms`;
            }
            observer.observe(item);
        });
    }


    // ===================================
    // ==== 4. Project Filtering (Improved) ====
    // ===================================
    // This section has been rewritten to fix layout "jumps"
    // by using JavaScript to set 'display: none' after the CSS fade-out animation.
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-grid .project-card');
        
        // Get transition duration from CSS.
        // The .skill-item, .project-card rule (for 3D hover) has 0.5s (500ms)
        const transitionDuration = 500; 

        filterBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                // Set active class on button
                if (filterContainer.querySelector('.active')) {
                    filterContainer.querySelector('.active').classList.remove('active');
                }
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const shouldShow = (filterValue === 'all' || card.dataset.category === filterValue);

                    if (shouldShow) {
                        // 1. Set display to '' (reverting to default, e.g., 'block')
                        //    so it takes up space *before* animating.
                        card.style.display = ''; 
                        
                        // 2. Force a reflow. This is a trick to ensure the browser
                        //    registers the 'display' change before the class change.
                        void card.offsetWidth;

                        // 3. Remove 'hide' class to trigger the fade-in/scale-in animation
                        card.classList.remove('hide');
                    } else {
                        // 1. Add 'hide' class to trigger the fade-out/scale-out animation
                        card.classList.add('hide');

                        // 2. After the animation finishes, set display to 'none'
                        //    so it collapses and doesn't take up space.
                        setTimeout(() => {
                            // Only set display:none if it's still hidden
                            // (user might have clicked another filter quickly)
                            if (card.classList.contains('hide')) {
                                card.style.display = 'none';
                            }
                        }, transitionDuration);
                    }
                });
            });
        });
    }

    
    // ===================================
    // ==== 5. Mobile Menu Toggle (NEW) ====
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Change hamburger icon to 'X' (times)
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Optional: Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    // Reset icon
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

});

