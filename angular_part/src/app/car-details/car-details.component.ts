import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Для работы с директивами ngIf/ngFor
import { Car } from '../services/car.service';  

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],  // Просто импортируешь CommonModule
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarsDetailsComponent implements OnInit {
  car!: Car;  // Типизация для car

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = 1;  // Пример, можешь получать id из URL или передавать другим способом
    this.http.get<Car>(`http://127.0.0.1:8000/api/cars/${id}/`).subscribe(
      (data: Car) => {
        this.car = data;  // Теперь данные с типом Car
      },
      (error) => {
        console.error('Ошибка загрузки данных', error);
      }
    );
  }
}
