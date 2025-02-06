import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ListComponent} from "./posts/list/list.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {ProfileComponent} from "./profile/profile.component";
import {DetailComponent} from "./posts/detail/detail.component";
import {FormComponent} from "./posts/form/form.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Register', path: 'register', component: RegisterComponent },
  { title: 'Posts', path: 'posts', component: ListComponent },
  { title: 'Post', path: 'posts/:id', component: DetailComponent },
  { title: 'Create', path: 'create', component: FormComponent },
  { title: 'Subjects', path: 'subjects', component: SubjectsComponent },
  { title: 'Profile', path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
