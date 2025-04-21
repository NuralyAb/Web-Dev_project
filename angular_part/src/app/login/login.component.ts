import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 


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

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    console.log('Login attempt:', this.credentials);
  
  
    const mockUserData = {
      name: 'Иван Иванов',
      email: this.credentials.email
    };
  
    this.authService.login(mockUserData);
    this.router.navigate(['/cars']);
  }
  
}
