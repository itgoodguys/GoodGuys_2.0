
// CSS import
import '../css/contact-us.scss'

// Selecting form elements
const nameForm = document.querySelector("#full-name");
const companyForm = document.querySelector("#company-name");
const emailForm = document.querySelector("#company-email");
const submitButton = document.querySelector("#contact-submit");

// Variables
let nameIsValid = false;
let companyIsValid = false;
let emailIsValid = false;

// Helper Functions
const validateEmail = (value) => {
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return emailValidation.test(value);
};

const applyInvalidStyles = (el) => {
  el.classList.add("input-error-state");
};

const applyValidStyles = (el) => {
  el.classList.remove("input-error-state");
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.classList.add("submit-disabled-state");
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.classList.remove("submit-disabled-state");
};

const updateSubmitButton = () => {
  if (nameIsValid && companyIsValid && emailIsValid) {
    enableSubmitButton();
  } else {
    disableSubmitButton();
  }
};

// Event Listeners
nameForm.addEventListener("input", (event) => {
  const nameFormValue = event.target.value.trim();
  if (nameFormValue) {
    nameIsValid = true;
    applyValidStyles(nameForm);
  } else {
    nameIsValid = false;
    applyInvalidStyles(nameForm);
  }
  updateSubmitButton();
});

companyForm.addEventListener("input", (event) => {
  const companyFormValue = event.target.value.trim();
  if (companyFormValue) {
    companyIsValid = true;
    applyValidStyles(companyForm);
  } else {
    companyIsValid = false;
    applyInvalidStyles(companyForm);
  }
  updateSubmitButton();
});

emailForm.addEventListener("input", (event) => {
  const emailFormValue = event.target.value.trim();
  if (validateEmail(emailFormValue)) {
    emailIsValid = true;
    applyValidStyles(emailForm);
  } else {
    emailIsValid = false;
    applyInvalidStyles(emailForm);
  }
  updateSubmitButton();
});

// Execution
updateSubmitButton();




// we are adding the value of the select field in the hidden input field
document.querySelector('.custom-select-trigger').addEventListener('click', function() {
  document.querySelector('.custom-options').classList.toggle('show');
  document.querySelector('.custom-select-trigger-icon').classList.toggle('dropdown-open');
});

document.querySelectorAll('.custom-option').forEach(function(option) {
  option.addEventListener('click', function() {
      document.querySelector('.custom-select-trigger-text').textContent = this.textContent;
      document.querySelector('.custom-options').classList.remove('show');
      document.querySelector('.custom-select-trigger-icon').classList.remove('dropdown-open');
      // Set the value of the input field with id "budget"
      document.getElementById('budget').value = this.textContent;
  });
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.custom-select-wrapper')) {
      document.querySelector('.custom-options').classList.remove('show');
      document.querySelector('.custom-select-trigger-icon').classList.remove('dropdown-open');
  }
});



const form = document.querySelector('.contact-form'); // Select the form element
const lottieAnimationLeft = document.querySelector('.contact-form_success-confeti-left');
const lottieAnimationRight = document.querySelector('.contact-form_success-confeti-right'); 

form.addEventListener('submit', function (e) {
    // e.preventDefault(); // Prevent the form from submitting immediately

    form.addEventListener('wfFormDone', function () {
        // The form has been successfully submitted and success message is displayed
        lottieAnimationLeft.play(); // Play the Lottie animation
        lottieAnimationRight.play(); // Play the Lottie animation
    });
});


// Select the hidden language input element
const languageInput = document.querySelector('.contact-hidden-language-input');

if (languageInput) {
  // Check if the URL contains '/en/'
  if (window.location.pathname.includes('/en/')) {
    // Set the value to "english" if '/en/' is in the URL
    languageInput.value = "english";
  } else {
    // Set the value to "swedish" if '/en/' is not in the URL
    languageInput.value = "swedish";
  }
}
