// Skill bar and counter animations
document.addEventListener('DOMContentLoaded', () => {
    // Function to handle skill bar animation
    function handleSkillBars(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillFills = skillBar.querySelectorAll('.skill-fill');
                
                // Add the animated class
                skillBar.classList.add('animated');
                
                // Set the skill width
                skillFills.forEach(skillFill => {
                    skillFill.style.width = skillFill.getAttribute('data-skill');
                });

                // Stop observing once the animation has been triggered
                observer.unobserve(skillBar);
            }
        });
    }

    // Create an Intersection Observer for skill bars
    const skillBarObserver = new IntersectionObserver(handleSkillBars, {
        threshold: 0.5 // Trigger animation when 50% of the skill-bar is in view
    });

    // Observe each skill-bar
    document.querySelectorAll('.skill-bar').forEach(skillBar => {
        skillBarObserver.observe(skillBar);
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const countUp = (element, end) => {
        let start = 0;
        const duration = 2000; // Duration of the counter animation in ms
        const stepTime = 50; // Time between updates in ms
        const steps = Math.ceil(duration / stepTime);
        const stepValue = Math.ceil(end / steps);

        const updateCounter = () => {
            start += stepValue;
            if (start >= end) {
                element.textContent = end;
                return;
            }
            element.textContent = start;
            setTimeout(updateCounter, stepTime);
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const endValue = parseInt(counter.getAttribute('data-count'), 10);
                    countUp(counter, endValue);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
