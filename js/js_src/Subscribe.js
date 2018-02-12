function Subscribe() {
  this.successMessage = 'Thanks for subscribing!';
  this.missingEmailAddressMessage = 'Your email address is required.';
  this.invalidEmailAddressMessage = 'Your email address looks incorrect, please try again.';
  this.botSubmissionErrorMessage = 'This doesn\'t look like a human submission.';
  this.invalidParametersErrorMessage = 'This form has missing or invalid fields.';
  this.unknownErrorMessage = 'Sorry, an unknown error has occurred. Please try again later.';
}

Subscribe.prototype.isBotPost = function(formElement) {
  return document.querySelectorAll('.email-octopus-form-row-hp input')[0].value;
}

Subscribe.prototype.basicValidateEmail = function(email) {
  var regex=/\S+@\S+\.\S+/;
  return regex.test(email);
}

Subscribe.prototype.fetchSuccess = function(formElement, subscribe) {
  document.getElementById('success-message').innerHTML = subscribe.successMessage;
  formElement.style.display = 'none';
}

Subscribe.prototype.fetchError = function(formElement, response, subscribe) {
  var errorMsg = document.getElementById('error-message');
  if(response && response.error && response.error.code) {
    switch(response.error.code) {
      case'INVALID_PARAMETERS':
        errorMsg.innerHTML = subscribe.invalidParametersErrorMessage;
        return;
      case'BOT_SUBMISSION':
        errorMsg.innerHTML = subscribe.botSubmissionErrorMessage;
        return;
    }
  }
  errorMsg.innerHTML(this.unknownErrorMessage);
  document.getElementById('submit-button').removeAttribute('disabled');
}

Subscribe.prototype.formSubmit = function (formElement, subscribe) {
  document.getElementById('submit-button').setAttribute('disabled', true);
  fetch('https://emailoctopus.com/lists/ab019fbc-f4b0-11e7-a98f-06b2d989fe84/members/external-add', {
    method: 'POST',
    body: new FormData(formElement)
  }).then(function(response) {
    if( response.status === 200) {
      subscribe.fetchSuccess(formElement, subscribe);
    } else {
      subscribe.fetchError(formElement, error, subscribe);
    }
  })
}
