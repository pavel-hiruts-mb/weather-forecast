import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {API_ENDPOINTS} from '../../constants/api-endpoints';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {CreateSummaryModel} from '../../interfaces/create-summary-model';
import {UpdateSummaryModel} from '../../interfaces/update-summary-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getForecast$(): Observable<ForecastViewModel[]> {
    return this.http
      .get<ForecastViewModel[]>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_ALL}`)
      .pipe(map(forecasts => forecasts.map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.calculateFahrenheit(forecast.temperatureC) }))))
      .pipe(catchError(this.handleError));
  }

  public getSummaries$(): Observable<SummaryViewModel[]> {
    return this.http
    .get<SummaryViewModel[]>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_ALL}`)
    .pipe(catchError(this.handleError));
  }

  public postSummary$(data: CreateSummaryModel): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_POST}`, data)
      .pipe(catchError(this.handleError));
  }

  public putSummary$(id: number, data: UpdateSummaryModel): Observable<SummaryViewModel> {
    return this.http
      .put<SummaryViewModel>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_PUT}${id}`, data)
      .pipe(catchError(this.handleError));
  }

  putForecast$(id: number, data: ForecastUpdateModel) {
    return this.http
      .put<ForecastViewModel>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_PUT}${id}`, data)
      .pipe(map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.calculateFahrenheit(forecast.temperatureC) })))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }

  private calculateFahrenheit(celsius: number): number {
    return 32 + (celsius / 0.5556);
  }
}
