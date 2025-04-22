import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: Car | undefined;
  isBookingSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.car = this.carService.getCarById(Number(id));
    }

    if (!this.car) {
      this.navigateBack();
    }
  }

  bookCar(): void {
    if (!this.car) return;

    this.isLoading = true;
    this.isBookingSuccess = false;

    this.carService.bookCar(this.car.id)
      .then(success => {
        this.isBookingSuccess = success;
        this.isLoading = false;

        if (success) {
          setTimeout(() => {
            this.isBookingSuccess = false;
          }, 5000);
        }
      })
      .catch(error => {
        console.error('Booking failed:', error);
        this.isLoading = false;
      });
  }

  navigateBack(): void {
    this.router.navigate(['/cars']);
  }
}
