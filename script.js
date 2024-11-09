// Wait for DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Theme Toggle Functionality
    const themeButton = document.getElementById("theme-button");
    if (themeButton) {
        const toggleDarkMode = () => {
            document.body.classList.toggle("dark-mode");
        }
        themeButton.addEventListener("click", toggleDarkMode);
    }

    // Initialize signature counter
    let count = 3;

    // Function to show alerts for navigation
    function showAlert(message) {
        alert(message);
    }

    // Function to add a new signature
    const addSignature = () => {
        // Get form input values
        const name = document.getElementById('name').value;
        const hometown = document.getElementById('hometown').value;
        
        // Create and format new signature
        const newSignature = document.createElement('p');
        newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;
        
        // Add new signature to the signatures section
        const signaturesSection = document.querySelector('.signatures');
        if (signaturesSection) {
            signaturesSection.appendChild(newSignature);
        }
        
        // Update signature counter
        const oldCounter = document.getElementById('counter');
        if (oldCounter) {
            oldCounter.remove();
        }
        count++;
        
        // Create and add new counter
        const newCounter = document.createElement('p');
        newCounter.id = 'counter';
        newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
        const petitionSection = document.querySelector('.petition');
        const petitionContainer = document.querySelector('.petition-container');
        if (petitionSection && petitionContainer) {
            petitionSection.insertBefore(newCounter, petitionContainer);
        }
    }

    // Form validation function
    const validateForm = () => {
        let containsErrors = false;
        const petitionForm = document.getElementById("sign-petition");
        if (!petitionForm) return;

        const petitionInputs = petitionForm.elements;
        const email = document.getElementById('email');

        // Validate input lengths
        for (let i = 0; i < petitionInputs.length; i++) {
            if (petitionInputs[i].value.length < 2) {
                petitionInputs[i].classList.add('error');
                containsErrors = true;
            } else {
                petitionInputs[i].classList.remove('error');
            }
        }

        // Validate email format
        if (email && !email.value.includes('.com')) {
            email.classList.add('error');
            containsErrors = true;
        } else if (email) {
            email.classList.remove('error');
        }

        // If no errors, add signature and clear form
        if (!containsErrors) {
            addSignature();
            // Clear all form inputs
            for (let i = 0; i < petitionInputs.length; i++) {
                petitionInputs[i].value = "";
            }
        }
    }

    // Add event listeners for buttons
    const signNowButton = document.getElementById("sign-now-button");
    if (signNowButton) {
        signNowButton.addEventListener('click', validateForm);
    }

    const exploreStoriesButton = document.querySelector("button[onclick=\"location.href='#stories'\"]");
    if (exploreStoriesButton) {
        exploreStoriesButton.addEventListener("click", function() {
            showAlert("You are about to explore stories from different cultures!");
        });
    }

    const meetPeopleButton = document.querySelector("button[onclick=\"location.href='#people'\"]");
    if (meetPeopleButton) {
        meetPeopleButton.addEventListener("click", function() {
            showAlert("You are about to meet people from diverse backgrounds!");
        });
    }

    // Contact form submission handler
    const contactForm = document.querySelector(".contact-section form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Thank you for reaching out! We will get back to you soon.");
            contactForm.reset();
        });
    }
});