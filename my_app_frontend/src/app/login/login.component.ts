import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { regex } from '../environments/regex';
import { message } from '../environments/en';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  emailPattern = regex.emailPattern;
  emailRequired = message.register.emailRequired;
  passwordRequired = message.register.passwordRequired;
  nameRequired = message.register.nameRequired;
  phoneNumberRequired = message.register.phoneNumberRequired;
  invalidEmail = message.register.invalidEmail;
  passwordMinLength = message.register.passwordMinLength;
  passwordMaxLength = message.register.passwordMaxLength;



  constructor(private router: Router,private formBuilder: FormBuilder,private authService:AuthService,private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email:['', Validators.required,]
      
    });
   }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

   submitLogin() {
    try {
      this.isSubmitted = true;
      if (!this.loginForm.valid) {
        return;
      }
      
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      
      this.authService.login(body).subscribe({
        next: (res: any) => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            this.toastr.success(res.message);
            this.router.navigate(['/verification']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err: any) => {
          this.toastr.error(err)
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message)
      return;
    }
  }
  
  // Add this function to your AuthService class
  getAuthorizationHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  


}