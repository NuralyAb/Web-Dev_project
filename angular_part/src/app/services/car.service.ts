import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      model: 'Model 3',
      brand: 'Tesla',
      price: 100,
      image: 'https://avatars.mds.yandex.net/i?id=0e511dc9718f0fa1da021da63e09f5f926507b85-4599704-images-thumbs&n=13',
      description: 'Electric car with autopilot',
      specifications: {
        fuelType: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        features: ['Autopilot', 'Premium Sound System']
      }
    },
    {
      id: 2,
      model: '3 Series',
      brand: 'BMW',
      price: 120,
      image: 'https://avatars.mds.yandex.net/i?id=9172c0ae593bc3894f8c7298fccc89347967f023-5236410-images-thumbs&n=13',
      description: 'Luxury sedan with premium features',
      specifications: {
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        seats: 5,
        features: ['Sport Mode', 'Heated Seats']
      }
    },
    {
      id: 3,
      model: 'C-Class',
      brand: 'Mercedes',
      price: 130,
      image: 'https://avatars.mds.yandex.net/i?id=b08df3a8448817365731c1ca2c61ee9188401d83-5889153-images-thumbs&n=13',
      description: 'Elegant and comfortable sedan',
      specifications: {
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        seats: 5,
        features: ['Ambient Lighting', 'Premium Package']
      }
    }
  ];

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: number): Car | undefined {
    return this.cars.find(car => car.id === id);
  }

  bookCar(carId: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Car ${carId} booked successfully`);
        resolve(true);
      }, 1000);
    });
  }
}
