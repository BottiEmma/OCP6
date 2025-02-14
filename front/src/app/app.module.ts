import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DetailComponent } from './posts/detail/detail.component';
import { FormComponent } from './posts/form/form.component';
import { ListComponent } from './posts/list/list.component';
import {AsyncPipe, NgForOf} from "@angular/common";
import { SubjectsComponent } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, DetailComponent, FormComponent, ListComponent, SubjectsComponent, HeaderComponent, RegisterComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AsyncPipe,
    NgForOf,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
