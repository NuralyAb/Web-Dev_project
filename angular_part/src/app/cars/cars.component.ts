import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  cars: Car[] = [];

  constructor(private carService: CarService) {
    this.cars = this.carService.getAllCars();
  }
}

