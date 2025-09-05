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
    // ==== 4. Project Filtering ====
    // ===================================
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-grid .project-card');

        filterBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                // Set active class on button
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

});