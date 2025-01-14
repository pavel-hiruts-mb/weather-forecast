import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {API_ENDPOINTS} from '../../constants/api-endpoints';
import {WeatherForecast} from '../../interfaces/weather-forecast';
import {Summary} from '../../interfaces/summary';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getForecast$(): Observable<WeatherForecast[]> {
    return this.http
      .get<WeatherForecast[]>(`${this.baseUrl}${API_ENDPOINTS.FORECAST}`)
      .pipe(catchError(this.handleError));
  }

  public getSummaries$(): Observable<Summary[]> {
    return this.http
    .get<Summary[]>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
