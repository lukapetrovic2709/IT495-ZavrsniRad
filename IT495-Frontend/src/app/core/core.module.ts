import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation/navigation.component";
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTokenInterceptor } from "./interceptors/http.token.interceptor";

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  exports: [NavigationComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class CoreModule {}
