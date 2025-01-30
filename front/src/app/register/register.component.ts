import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {User} from "../interfaces/user.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  submit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.userService.register(user).subscribe({
        next: () => {
          console.log('Registration successful');
          alert('Votre compte a bien été créé ! Vous allez être redirigé vers la page de connexion.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          if (err.status === 400 && err.error?.error) {
            alert(err.error.error);
          } else {
            alert('L\'inscription n\'a pas fonctionné. Veuillez rééssayer.');
          }
        },
      });
    }
  }


}
