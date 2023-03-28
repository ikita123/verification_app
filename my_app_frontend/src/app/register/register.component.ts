import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { message } from '../environments/en';
import { regex } from '../environments/regex';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm: FormGroup;
  isSubmitted: boolean = false;
  emailPattern = regex.emailPattern;
  emailRequired = message.register.emailRequired;
  passwordRequired = message.register.passwordRequired;
  nameRequired = message.register.nameRequired;
  phoneNumberRequired = message.register.phoneNumberRequired;
  invalidEmail = message.register.invalidEmail;
  passwordMinLength = message.register.passwordMinLength;
  passwordMaxLength = message.register.passwordMaxLength;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }


  register() {
    try {
      this.isSubmitted = true;
      if (!this.registrationForm.valid) {
        return;
      }
      const body = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        phone: this.registrationForm.value.phone
      };
      this.authService.register(body).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.router.navigate(['/login']);
          } else {
            const errorMessage = res.message;
            this.toastr.error(errorMessage);
          }
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
        }

      });
    } catch (error: any) {
      this.toastr.error(error.message)
      return;
    }
  }
}
