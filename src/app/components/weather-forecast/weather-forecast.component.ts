import { Component, OnInit } from '@angular/core';
import {ApiService}  from '../../services/api/api.service';
import {WeatherForecast} from '../../interfaces/weather-forecast';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  imports: [
    NgForOf
  ],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnInit {

  forecasts: WeatherForecast[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getWeatherForecast$().subscribe(response => {
      this.forecasts = response;
    })
  }
}
