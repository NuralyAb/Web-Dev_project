import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

interface Booking {
  brand: string;
  model: string;
  date: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+7 777 777 77 77'
  };

  bookings: Booking[] = [
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
