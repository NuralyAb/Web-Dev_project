import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule], // Добавляем CommonModule для *ngFor
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  };

  bookings = [
    {
      brand: 'Tesla',
      model: 'Model 3',
      date: '15.04.2025'
    },
    {
      brand: 'BMW',
      model: '3 Series',
      date: '20.03.2025'
    }
  ];
}
