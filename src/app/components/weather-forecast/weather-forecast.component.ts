import { Component, OnInit } from '@angular/core';
import {ApiService}  from '../../services/api/api.service';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {DatePipe, DecimalPipe, NgForOf} from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-forecast',
  imports: [
    NgForOf,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnInit {

  forecasts: ForecastViewModel[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getForecast$()
      .pipe(map(forecasts => forecasts.map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.calculateFahrenheit(forecast.temperatureC) }))))
      .subscribe(response => { this.forecasts = response; })
  }

  private calculateFahrenheit(celsius: number): number {
    return 32 + (celsius / 0.5556);
  }
}
