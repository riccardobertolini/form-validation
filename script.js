function hideErrors () {
    const allErrors = Array.from(document.querySelectorAll('.field-error')).forEach(error => !error.classList.contains('hidden') && error.classList.add('hidden'));
}

function showErrors(errorsList) {
  errorsList.forEach(failingField => {
      document.getElementById(failingField).classList.remove('hidden');
    });
}

function validateForm(event) {
  hideErrors();
  const fields = document.querySelectorAll('.form-input');
  const errors = Array.from(fields).map(field => validateField(field)).filter(item => item);
  if(errors.length === 0) {
    return true;   
  }
  showErrors(errors);
  return false;
}

const validateText = (value) => {
  const rules = /[A-Za-z0-9 _]/g;
  return rules.test(value);
};

const validatePhone = (value) => {
  const rules = /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
  return rules.test(value);
};

const validateNumber = (value) => {
  const rules = /^[0-9]*$/;
  return rules.test(value);
};

const validateEmail = (value) => {
  const rules = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return rules.test(value);
};

const validateDate = (value) => {
  const rules = /^[0-9-.\/]$/g;
  return rules.test(value);
};


const isEmpty = (value) => value === '' || value === undefined || value.length === 0;

const isMultiFieldEmpty = (field) => {
  return !Array.from(document.getElementsByName(field.name)).some(field => field.checked);
};

const getBoolean = (value) => value === 'true';

const validateField = (field) => {
const isRequired = getBoolean(field?.attributes['data-required'].value);
const isMultiField = field.type === 'radio' || field.type === 'checkbox';
  
  if(isRequired && isMultiField && isMultiFieldEmpty(field)) { 
    return `${field.name}-error-1`;
  }
  
  if(isRequired && isEmpty(field.value)) {
    return `${field.name}-error-1`;
  }
  if(!isEmpty(field.value)) {
    switch(field.type){
        case 'text':
          return validateText(field.value) ? null : `${field.name}-error-2`;
          break;
        case 'email':
          return validateEmail(field.value) ? null : `${field.name}-error-2`;
          break;
        case 'tel':
          return validatePhone(field.value) ? null : `${field.name}-error-2`;
          break;
        case 'number':
          return validateNumber(field.value) ? null : `${field.name}-error-2`;
          break;
        case 'date':
          return validateDate(field.value) ? null : `${field.name}-error-2`;
          break;
    }
  }
}

