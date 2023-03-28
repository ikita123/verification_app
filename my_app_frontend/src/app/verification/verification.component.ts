import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { message } from '../environments/en';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  isSubmitted: boolean = false
  codeRequired = message.otpVerification.codeRequired;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.verificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.verificationForm.controls;
  }

  submitVerify() {
    try {
      this.isSubmitted = true;
      if (!this.verificationForm.valid) {
        return;
      }
      const body = {
        code: this.verificationForm.value.code,

      };
      const token = localStorage.getItem('token')
      this.authService.verify(body, token).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.router.navigate(['/home']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err: any) => {
          this.toastr.error(err);
        }
      });
    } catch (error: any) {
      this.toastr.error(error.message);
      return;
    }
  }


}
