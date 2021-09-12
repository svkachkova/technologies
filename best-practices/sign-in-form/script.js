const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const signinButton = document.querySelector('button#sign-in');
const togglePasswordButton = document.getElementById('toggle-password');

togglePasswordButton.addEventListener('click', togglePassword);

function togglePassword() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.textContent = 'Hide password';
        togglePasswordButton.setAttribute('aria-label', 'Hide password.');
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.textContent = 'Show password';
        togglePasswordButton.setAttribute('aria-label', 'Show password as plain text. Warning: this will display your password on the screen.');
    }
}

passwordInput.addEventListener('input', resetCustomValidity);

function resetCustomValidity() {
    passwordInput.setCustomValidity('');
}

form.addEventListener('submit', handleFormSubmission);

function handleFormSubmission(event) {

    event.preventDefault();
    validatePassword();
    form.reportValidity();

    if (form.checkValidity() === true) {
        // On a production site do form submission.
        alert('Loggin in!');
        signinButton.disabled = 'true';
    } else {
        // Handle invalid form
    }
}

// A production site would use more stringent password testing.
function validatePassword() {
    let message = '';

    if (!/.{8,}/.test(passwordInput.value)) {
        message = 'At least eight characters. ';
    }

    if (!/.*[A-Z].*/.test(passwordInput.value)) {
        message += 'At least one uppercase letter. ';
    }

    if (!/.*[a-z].*/.test(passwordInput.value)) {
        message += 'At least one lowercase letter.';
    }

    passwordInput.setCustomValidity(message);
}
