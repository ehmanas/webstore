import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': 'Mandatory',
      'invalidEmailAddress': 'Email address not valid',
      'invalidPassword': 'At least 6 characters with 1 number',
      'minlength': `Min value ${validatorValue.requiredLength} characters`,
      'maxlength': `Max value ${validatorValue.requiredLength} characters`,
      'invalidOldPassword': 'Old password not valid',
      'notmatchPasswords': 'Password and Confirm Password do not match',
      'emailExists': 'Email already exists'
    };
    return config[validatorName];
  }

  static emailValidator(control: AbstractControl) {
    // RFC 2822 compliant regex
    // eslint-disable-next-line max-len
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static emptyValidator(control: AbstractControl) {
    // RFC 2822 compliant regex
    if (control.value && control.value.trim().length > 0) {
      return null;
    } else {
      return {'required': true};
    }
  }

  static passwordValidator(control: AbstractControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }


  static matchingPasswords(control: AbstractControl): ValidationErrors | null {
    if (control) {
      let passwordInput = control.get('password');
      if (!passwordInput) {
        passwordInput = control.get('newPassword');
      }
      const passwordConfirmationInput = control.get('confirmPassword');
      if ((passwordInput && passwordConfirmationInput) && passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({'notmatchPasswords': true});
        return ({'notmatchPasswords': true});
      } else {
        return null;
      }
    }
    return null;
  }
}
