import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly cookieService: CookieService
  ) {
    const userId = cookieService.get('user_id');
    console.log(`userId`, userId);
    if (!!userId) {
      this.router.navigate(['/books', { userId }]);
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    this.error = null;

    if (this.form.valid) {
      const { email, password } = this.form.value;

      const { code, message, user } = this.authService.login({
        email,
        password,
      });

      if (code === 400) {
        this.error = message;
      } else {
        this.router.navigate(['/books']);
      }
    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
