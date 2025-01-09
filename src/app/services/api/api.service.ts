import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { WeatherForecast } from '../../interfaces/weather-forecast';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(
    //private http: HttpClient
  ) { }

  public getWeatherForecast$() {
    //return this.http.get<WeatherForecast[]>('http://localhost:7200/WeatherForecast');
    return [{date: '2025-01-10', temperatureC: 39, temperatureF: 102, summary: 'Warm'}];
  }
}
