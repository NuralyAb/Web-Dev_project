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
  phoneNumber: string = '';
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
    if (!this.car || !this.phoneNumber) return;

    this.isLoading = true;
    this.carService.bookCar(this.car.id, this.phoneNumber)
      .then(success => {
        this.isBookingSuccess = success;
        this.isLoading = false;
      });
  }

  navigateBack(): void {
    this.router.navigate(['/cars']);
  }


}
