import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerificationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    ToastrModule.forRoot({"maxOpened":0,"preventDuplicates":true,"resetTimeoutOnDuplicate":true,"includeTitleDuplicates":true,"autoDismiss":true,"timeOut":1500,"positionClass":"toast-top-right"}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
