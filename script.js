/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT - KAVAN PATEL (FULL STACK DEVELOPER)
 * Pure Vanilla JavaScript (ES6+) - Zero External Libraries
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. TYPING EFFECT (Hero Section)
     -------------------------------------------------------------------------- */
  const typedTextElement = document.getElementById('typed-text');
  const roles = [
    'Full Stack Developer',
    'Web Developer',
    'JavaScript Developer',
    'MERN Stack Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    // Finished typing full word
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedTextElement) {
    typeEffect();
  }


  /* --------------------------------------------------------------------------
     2. DARK / LIGHT THEME TOGGLE (with LocalStorage)
     -------------------------------------------------------------------------- */
  const themeButton = document.getElementById('theme-button');
  const selectedTheme = localStorage.getItem('selected-theme');

  // Apply saved theme if available
  if (selectedTheme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(selectedTheme);
  }

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('selected-theme', 'light-theme');
        showToast('Switched to Light Mode', 'info');
      } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('selected-theme', 'dark-theme');
        showToast('Switched to Dark Mode', 'info');
      }
    });
  }


  /* --------------------------------------------------------------------------
     3. MOBILE NAVIGATION MENU
     -------------------------------------------------------------------------- */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  // Open menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close menu with close button
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close menu when clicking on any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show-menu')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
      }
    }
  });


  /* --------------------------------------------------------------------------
     4. STICKY HEADER & ACTIVE LINK ON SCROLL (SCROLL SPY)
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header background blur on scroll
    if (scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }

    // Scroll to top button visibility
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      if (scrollY >= 350) {
        scrollTopBtn.classList.add('show-scroll');
      } else {
        scrollTopBtn.classList.remove('show-scroll');
      }
    }

    // Active link highlighting
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const sectionLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (sectionLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionLink.classList.add('active-link');
        } else {
          sectionLink.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run on load


  /* --------------------------------------------------------------------------
     5. SCROLL TO TOP ACTION
     -------------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --------------------------------------------------------------------------
     6. PROJECT CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.classList.add('hide');
          }, 300);
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
     7. ANIMATE STATS COUNTERS (Intersection Observer)
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-card__number');
  let statsAnimated = false;

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = +stat.getAttribute('data-target');
      const duration = 1800; // ms
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.about__stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }


  /* --------------------------------------------------------------------------
     8. ANIMATE SKILLS PROGRESS BARS (Intersection Observer)
     -------------------------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach((bar) => {
    skillsObserver.observe(bar);
  });


  /* --------------------------------------------------------------------------
     9. SCROLL REVEAL ANIMATION (Smooth Entrance)
     -------------------------------------------------------------------------- */
  const revealItems = document.querySelectorAll('.reveal-item');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });


  /* --------------------------------------------------------------------------
     10. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user_name');
  const emailInput = document.getElementById('user_email');
  const subjectInput = document.getElementById('user_subject');
  const messageInput = document.getElementById('user_message');
  const submitBtn = document.getElementById('submit-btn');

  // Helper validation functions
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

  function setError(input, errorElementId, message) {
    input.classList.add('error');
    const errSpan = document.getElementById(errorElementId);
    if (errSpan) errSpan.textContent = message;
  }

  function clearError(input, errorElementId) {
    input.classList.remove('error');
    const errSpan = document.getElementById(errorElementId);
    if (errSpan) errSpan.textContent = '';
  }

  // Real-time input listeners to clear errors
  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
  if (subjectInput) subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput, 'name-error', 'Please enter your full name.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        setError(nameInput, 'name-error', 'Name must be at least 2 characters long.');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        setError(emailInput, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        setError(emailInput, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setError(subjectInput, 'subject-error', 'Please specify a subject.');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput, 'message-error', 'Please provide a message description.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, 'message-error', 'Message must be at least 10 characters.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      if (!isValid) return;

      // Simulate form submission state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner" style="width:16px;height:16px;border-width:2px;margin:0;display:inline-block;"></span>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();

        showToast('Thank you! Your message has been sent to Kavan Patel.', 'success');
      }, 1400);
    });
  }


  /* --------------------------------------------------------------------------
     11. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message, type = 'success') {
    if (!toast || !toastMessage) return;

    clearTimeout(toastTimer);
    toastMessage.textContent = message;

    if (type === 'info') {
      toast.style.borderColor = 'rgba(99, 102, 241, 0.5)';
    } else {
      toast.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    }

    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }


  /* --------------------------------------------------------------------------
     12. RESUME DOWNLOAD HANDLER
     -------------------------------------------------------------------------- */
  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Generating Kavan Patel Resume PDF...', 'info');

      // Create a printable text/document representation or prompt
      setTimeout(() => {
        const resumeText = `================================================
KAVAN PATEL - FULL STACK DEVELOPER
================================================
Email: kavanpatel.dev@gmail.com
Role: Full Stack Web Developer
Stack: HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB, Git, REST APIs
Location: Gujarat, India (Open to Remote Worldwide)

Summary:
Passionate Full Stack Developer with experience in building modern, responsive, high-performance web applications.

Skills:
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI
- Backend: Node.js, Express.js, RESTful APIs, JWT Auth
- Database & Tools: MongoDB, Mongoose, Git, GitHub, Postman
================================================`;

        const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = downloadUrl;
        tempLink.download = 'Kavan_Patel_FullStack_Resume.txt';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        URL.revokeObjectURL(downloadUrl);

        showToast('Resume downloaded successfully!', 'success');
      }, 700);
    });
  }


  /* --------------------------------------------------------------------------
     13. INTERACTIVE LIVE DEMO MODAL
     -------------------------------------------------------------------------- */
  const demoModal = document.getElementById('demo-modal');
  const modalClose = document.getElementById('modal-close');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectDesc = document.getElementById('modal-project-desc');
  const demoButtons = document.querySelectorAll('.project-demo-btn');

  demoButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Project Demo';
      
      if (modalProjectTitle) {
        modalProjectTitle.textContent = `${title} - Live Preview`;
      }
      if (modalProjectDesc) {
        modalProjectDesc.textContent = `Interactive live preview instance initialized for "${title}". Built by Kavan Patel with clean architecture and responsive UI.`;
      }

      if (demoModal) {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeModal();
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
      closeModal();
    }
  });

});
