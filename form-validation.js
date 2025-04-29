document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('.feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Validate all form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid - you can submit it or process the data
                alert('Thank you for your feedback!');
                feedbackForm.reset(); // Reset the form
                
                // In a real application, you would submit the form here
                // feedbackForm.submit();
            }
        });
    }
    
    // Add event listeners for real-time validation
    const textareas = document.querySelectorAll('textarea[required]');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            validateTextarea(this);
        });
    });
    
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhone(this);
        });
    }
});

function validateForm() {
    let isValid = true;
    
    // Validate required textareas
    const requiredTextareas = document.querySelectorAll('textarea[required]');
    requiredTextareas.forEach(textarea => {
        if (!validateTextarea(textarea)) {
            isValid = false;
        }
    });
    
    // Validate email if provided
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() !== '') {
        if (!validateEmail(emailInput)) {
            isValid = false;
        }
    }
    
    // Validate phone if provided
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value.trim() !== '') {
        if (!validatePhone(phoneInput)) {
            isValid = false;
        }
    }
    
    // Validate at least one star rating is selected for each category
    const ratingGroups = document.querySelectorAll('.rating-group .rating-item');
    ratingGroups.forEach(group => {
        const ratingName = group.querySelector('.rating-stars input[type="radio"]').name;
        const selectedRating = document.querySelector(`input[name="${ratingName}"]:checked`);
        
        if (!selectedRating) {
            isValid = false;
            const label = group.querySelector('label');
            showError(label, 'Please select a rating');
        } else {
            clearError(group.querySelector('label'));
        }
    });
    
    return isValid;
}

function validateTextarea(textarea) {
    const value = textarea.value.trim();
    
    if (value === '') {
        showError(textarea, 'This field is required');
        return false;
    }
    
    if (value.length < 10) {
        showError(textarea, 'Please provide more detailed feedback (at least 10 characters)');
        return false;
    }
    
    clearError(textarea);
    return true;
}

function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email !== '' && !emailRegex.test(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput);
    return true;
}

function validatePhone(phoneInput) {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    
    if (phone !== '' && !phoneRegex.test(phone)) {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
        return false;
    }
    
    clearError(phoneInput);
    return true;
}

function showError(element, message) {
    clearError(element);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    // Insert the error message after the element
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    
    // Highlight the field
    element.style.borderColor = '#e74c3c';
}

function clearError(element) {
    // Remove existing error message
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    
    // Reset field style
    element.style.borderColor = '';
}