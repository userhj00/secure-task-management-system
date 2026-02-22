import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']   // ⭐ THIS WAS MISSING
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
  this.errorMessage = '';
  this.auth.login(this.email, this.password)
    .subscribe((res:any) => {

      // save token
      localStorage.setItem('token', res.access_token);

      // save user info (THIS FIXES undefined)
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('email', res.user.email);

      this.router.navigate(['/dashboard']);
    });
}
}