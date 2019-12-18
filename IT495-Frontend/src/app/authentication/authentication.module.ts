import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { FormsModule } from "@angular/forms";
import { VerificationComponent } from "./components/verification/verification.component";
import { CommonModule } from "@angular/common";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule
} from "@angular/material";
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificationComponent,
    ChangePasswordComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    CoreModule,
    MatInputModule
  ]
})
export class AuthenticationModule {}
