import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FahrenheitService {
  public calculateFahrenheit(celsius: number): number {
    return 32 + (celsius / 0.5556);
  }
}
