// Wait for DOM to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded"); 

    // Remove duplicate counters if they exist
    const counters = document.querySelectorAll('#counter');
    counters.forEach((counter, index) => {
        if (index > 0) { // Keep the first one, remove others
            counter.remove();
        }
    });

    const counter = document.querySelector('#counter');
    if (!counter) {
        console.log("Counter not found on page load - creating it");
        const petition = document.querySelector('.petition');
        if (petition) {
            const newCounter = document.createElement('p');
            newCounter.id = 'counter';
            newCounter.innerHTML = `🖊️ ${count} people have signed this petition and support this cause.`;
            petition.insertBefore(newCounter, petition.firstChild.nextSibling);
        }
    }

    // =============== THEME TOGGLE FUNCTIONALITY ===============
    const themeButton = document.getElementById("theme-button");
    if (themeButton) {
        console.log("Theme button found");
        const toggleDarkMode = () => {
            document.body.classList.toggle("dark-mode");
            console.log("Dark mode toggled");
        }
        themeButton.addEventListener("click", toggleDarkMode);
    }

    // =============== PETITION SIGNATURE FUNCTIONALITY ===============
    let count = 3; // Initialize counter with starting signatures

    // Function to show alerts for navigation
    function showAlert(message) {
        alert(message);
    }

    // Function to update the signature counter display
    const updateCounter = () => {
        console.log("Update counter called, count is:", count);
        const counter = document.querySelector('#counter'); // Changed to querySelector
        if (counter) {
            const counterText = `🖊️ ${count} ${count === 1 ? 'person has' : 'people have'} signed this petition and support this cause.`;
            counter.innerHTML = counterText;
            console.log("Counter updated with text:", counterText);
        } else {
            console.log("Counter element not found");
            // If counter is not found, try to create it
            const petition = document.querySelector('.petition');
            if (petition) {
                const newCounter = document.createElement('p');
                newCounter.id = 'counter';
                newCounter.innerHTML = `🖊️ ${count} people have signed this petition and support this cause.`;
                petition.insertBefore(newCounter, petition.firstChild.nextSibling);
                console.log("Created new counter element");
            }
        }
    }

    // Function to add a new signature to the petition
    const addSignature = () => {
        console.log("Add signature function called");
        
        // Get form input values
        const name = document.getElementById('name').value;
        const hometown = document.getElementById('hometown').value;
        
        console.log("Name:", name, "Hometown:", hometown);
        
        // Create and format new signature
        const newSignature = document.createElement('p');
        newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;
        
        // Add new signature to the signatures section
        const signaturesSection = document.querySelector('.signatures');
        if (signaturesSection) {
            signaturesSection.appendChild(newSignature);
            count++;
            updateCounter();
            console.log("Signature added, new count:", count);
        } else {
            console.log("Signatures section not found");
        }
    }

    // =============== FORM VALIDATION FUNCTIONALITY ===============
    const validateForm = () => {
        console.log("Validate form called");
        let containsErrors = false;
        const petitionForm = document.getElementById("sign-petition");
        if (!petitionForm) {
            console.log("Form not found");
            return;
        }

        // Get only the input elements, not the button
        const petitionInputs = petitionForm.querySelectorAll('input');
        const email = document.getElementById('email');

        // Validate input lengths
        petitionInputs.forEach(input => {
            console.log("Checking input:", input.value);
            if (input.value.length < 2) {
                input.classList.add('error');
                containsErrors = true;
            } else {
                input.classList.remove('error');
            }
        });

        // Validate email format
        if (email && !email.value.includes('.com')) {
            email.classList.add('error');
            containsErrors = true;
        } else if (email) {
            email.classList.remove('error');
        }

        console.log("Contains errors:", containsErrors);

        // If no errors, add signature and clear form
        if (!containsErrors) {
            console.log("Adding signature");
            addSignature();
            // Clear all inputs
            petitionInputs.forEach(input => {
                input.value = "";
            });
        }
    }

    // =============== EVENT LISTENERS SETUP ===============
    const signNowButton = document.getElementById("sign-now-button");
    if (signNowButton) {
        console.log("Sign now button found");
        signNowButton.addEventListener('click', function(e) {
            console.log("Sign now button clicked");
            validateForm();
        });
    } else {
        console.log("Sign now button not found");
    }

    // Add click handlers for navigation buttons
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

    // =============== CONTACT FORM HANDLER ===============
    const contactForm = document.querySelector(".contact-section form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission
            alert("Thank you for reaching out! We will get back to you soon.");
            contactForm.reset();
        });
    }

    // Initialize the signature counter display when the page loads
    updateCounter();
    console.log("Initial counter set");
});