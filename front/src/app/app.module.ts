import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DetailComponent } from './posts/detail/detail.component';
import { FormComponent } from './posts/form/form.component';
import { ListComponent } from './posts/list/list.component';
import {AsyncPipe, NgForOf} from "@angular/common";
import { SubjectsComponent } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, DetailComponent, FormComponent, ListComponent, SubjectsComponent, HeaderComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AsyncPipe,
    NgForOf
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
