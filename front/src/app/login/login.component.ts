import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from "../interfaces/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) {
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

          // Garde le token JWT
          localStorage.setItem('token', token.token);
          this.userService.getCurrentUser().subscribe((u: User) => {
            this.authService.login(u, token.token);
          })
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        },
      });
    }
  }

}
