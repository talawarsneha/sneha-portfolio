// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
let overlay;

// Create overlay element
function createOverlay() {
    if (overlay) return; // Don't create if it already exists
    
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);
}

// Toggle mobile menu
function toggleMenu() {
    const wasActive = mobileNav.classList.contains('active');
    
    // Close any open menus first
    document.querySelectorAll('.mobile-nav.active').forEach(menu => {
        menu.classList.remove('active');
    });
    document.querySelectorAll('.hamburger.active').forEach(btn => {
        btn.classList.remove('active');
    });
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
                overlay = null;
            }
        }, 300);
    }
    
    // If menu was not active, open it
    if (!wasActive) {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
        createOverlay();
        setTimeout(() => {
            if (overlay) overlay.classList.add('active');
        }, 10);
    } else {
        document.body.style.overflow = '';
    }
}

// Close menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling to document
        toggleMenu();
    });
});

// Initialize menu toggle
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling to document
        toggleMenu();
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileNav.contains(e.target) || (hamburger && hamburger.contains(e.target));
    if (!isClickInsideMenu && mobileNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 1024) {
            // Close menu if open when resizing to desktop
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        }
    }, 250);
});

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");
  const loadingContent = document.querySelector(".loading-content");

  // Enhanced showElement function with callback for completion
  function showElement(element, delay=0, onComplete) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
      if (onComplete) {
        setTimeout(onComplete, 900); // Match this with the fall animation duration
      }
    }, delay);
  }

  // Animation sequence
  showElement(loadingText, 200, () => {
    showElement(mainIcon, 0, () => {
      // Animate sub-icons one by one with a small delay
      let delay = 0;
      subIcons.forEach((icon, idx) => {
        setTimeout(() => {
          icon.classList.remove("hidden");
          icon.classList.add("fall");
        }, 100 * idx);
      });
      
      // Show designer text after sub-icons
      
// Form submission handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            // Disable the submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = '#4CAF50';
                formStatus.style.color = 'white';
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = '#f44336';
            formStatus.style.color = 'white';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } finally {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
      setTimeout(() => {
        designerText.classList.remove("hidden");
        designerText.classList.add("fall");
        
        // Start fade out after all animations complete
        setTimeout(() => {
          loadingContent.style.transform = 'translateY(-20px)';
          loadingContent.style.opacity = '0';
          loadingScreen.style.transition = 'opacity 0.8s ease-in-out';
          loadingScreen.style.opacity = '0';
          
          // Hide loading screen and show main content
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            mainPage.classList.add("visible");
            
            // Smooth scroll to top
            window.scrollTo(0, 0);
          }, 800);
        }, 1000);
      }, 300);
    });
  });
});
