import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: string = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService :AuthService
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      
      this.status= 'loading'
      this.authService.recovery(email).subscribe({
        next: (item)=>{
          console.log(item.recoveryToken);
          this.status = 'success'
          this.emailSent = !this.emailSent
        },
        error: ()=>{
          this.status='failed'
        },
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
