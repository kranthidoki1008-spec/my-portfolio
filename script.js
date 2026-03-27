/* 
  Modern Dark Theme Portfolio JavaScript
  Author: Kranthi
*/

document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect for Hero Section
    const typingText = document.querySelector('.typing-text');
    const words = ["Full Stack Web Developer", "UI/UX Designer", "Lifelong Learner"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        const currentText = isDeleting 
            ? currentWord.substring(0, charIndex - 1) 
            : currentWord.substring(0, charIndex + 1);

        typingText.textContent = currentText;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at the end of the word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 150;
        } else {
            typeSpeed = isDeleting ? 75 : 150;
        }

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        type();
    }

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add glowing effect to cards on mouse move
    const cards = document.querySelectorAll('.skill-card, .project-card, .edu-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
