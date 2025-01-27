import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from "../interfaces/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.userService.login(user).subscribe({
        next: (token) => {
          console.log('Login successful, token:', token);
          // Store the JWT token
          localStorage.setItem('token', token.token);

          // Navigate to another page (e.g., dashboard)
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        },
      });
    }
  }

}
