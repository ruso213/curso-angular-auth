import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { status } from '@models/status.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent  implements OnInit{

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(8)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: status = 'init';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private route : ActivatedRoute
  ) { 
    
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(item => {
      const param = item.get('email')
      if(param){
        this.form.controls.email.setValue(param)
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next: ()=>{
          
          
          this.status = 'success'
          this.router.navigate(['/app'])
        },
        error:()=>{
          this.status = 'failed'
        },
        
      })
      // TODO
    } else {
      this.form.markAllAsTouched();
    }
  }

}
