import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { WeatherForecast } from '../../interfaces/weather-forecast';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getWeatherForecast$(): Observable<WeatherForecast[]> {
    return this.http
      .get<WeatherForecast[]>('http://localhost:7200/WeatherForecast')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
