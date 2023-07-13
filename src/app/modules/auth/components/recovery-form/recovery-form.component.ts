import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { status } from '@models/status.model';

import { CustomValidators } from '@utils/validators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent implements OnInit{ 
  ngOnInit(): void {
    this.route.queryParamMap.subscribe( item => {
      const param = item.get('token')
      if(param){
        this.token = param
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
  private token = ''
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: status = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  recovery() {
    if (this.form.valid) {
      this.status = 'loading'
      const { confirmPassword , newPassword} = this.form.getRawValue()
      this.authservice.changePassword(newPassword , this.token).subscribe({
        next:()=>{
          this.status = 'success'
          this.router.navigate(['/login'])
        },
        error:()=>{
          this.status = 'failed'
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
