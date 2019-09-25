import { FormControl, FormArray } from '@angular/forms';


export class FormValidator {
  
  imgExt: string[] = ['jpg', 'png'];

  imageValidate(control: FormControl): {[s: string]: boolean} {
    if(!control.value) {
      return null;
    }
    const ext : string = control.value.substring(control.value.lastIndexOf('.') + 1);
    if(!(this.imgExt.indexOf(ext)!=-1)) {
      return {'invalidImage': true}
    }
    return null;
  }

  daysValidator(formArray: FormArray): {[s: string]: boolean} {
        
    for (let x = 0; x < formArray.length; ++x) {
        if (formArray.at(x).value) {
            return null;
        }
    }
    return {'invalidDays': true};
  }

  monthsValidator(formArray: FormArray): {[s: string]: boolean} {
        
    for (let x = 0; x < formArray.length; ++x) {
        if (formArray.at(x).value) {
            return null;
        }
    }
    return {'invalidDays': true};
  }
}