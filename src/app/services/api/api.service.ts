import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api-endpoints';
import { WeatherForecast } from '../../interfaces/weather-forecast';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getWeatherForecast$(): Observable<WeatherForecast[]> {
    return this.http
      .get<WeatherForecast[]>(`${this.baseUrl}${API_ENDPOINTS.WEATHER_FORECAST}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
