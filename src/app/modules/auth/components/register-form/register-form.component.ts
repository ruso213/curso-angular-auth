import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { status } from '@models/status.model';

import { CustomValidators } from '@utils/validators';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  isAvailableForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email ]]
  })
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: status = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  isAvailable = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.register(email , password, name).subscribe({
        next: ()=> {
          this.status= 'success'
          this.router.navigate(['/login'])
        },
        error: ()=> {
          this.status= 'failed'
        },

      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  checkEmail(){
    const { email } = this.isAvailableForm.getRawValue()
    if(this.isAvailableForm.valid){
      this.status = 'loading';

      this.authService.isAvailable(email).subscribe({
      next : (response)=>{
        this.status = 'success'
        if(response.isAvailable){
          this.isAvailable = !this.isAvailable
          this.form.controls.email.setValue(email)
        }else{
          this.router.navigate(['/login'], {
            queryParams: {
              email: email
            }
          })
        }
      },
      error: ()=>{
        this.status = 'failed'
        
      }
    })
  }
  }
}
