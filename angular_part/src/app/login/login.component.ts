import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login attempt:', this.credentials);
    // Здесь будет логика авторизации
    // После успешного входа:
    this.router.navigate(['/cars']);
  }
}
