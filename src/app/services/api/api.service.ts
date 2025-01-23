import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {API_ENDPOINTS} from '../../constants/api-endpoints';
import {map} from 'rxjs/operators';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {SummaryCreateModel} from '../../interfaces/summary-create-model';
import {SummaryUpdateModel} from '../../interfaces/summary-update-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {ForecastCreateModel} from '../../interfaces/forecast-create-model';
import {FahrenheitService} from '../fahrenheit/fahrenheit.service';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private fahrenheitService: FahrenheitService){
  }

  public getForecasts$(): Observable<ForecastViewModel[]> {
    return this.http
      .get<ForecastViewModel[]>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_ALL}`)
      .pipe(map(forecasts => forecasts.map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.fahrenheitService.calculateFahrenheit(forecast.temperatureC) }))))
      .pipe(catchError(this.handleError));
  }

  public getForecast$(id: number): Observable<ForecastViewModel> {
    return this.http
      .get<ForecastViewModel>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_GET}${id}`)
      .pipe(map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.fahrenheitService.calculateFahrenheit(forecast.temperatureC) })))
      .pipe(catchError(this.handleError));
  }

  public getSummaries$(): Observable<SummaryViewModel[]> {
    return this.http
    .get<SummaryViewModel[]>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_ALL}`)
    .pipe(catchError(this.handleError));
  }

  public postSummary$(data: SummaryCreateModel): Observable<SummaryViewModel> {
    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_POST}`, data)
      .pipe(catchError(this.handleError));
  }

  public putSummary$(id: number, data: SummaryUpdateModel): Observable<SummaryViewModel> {
    return this.http
      .put<SummaryViewModel>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_PUT}${id}`, data)
      .pipe(catchError(this.handleError));
  }

  public putForecast$(id: number, data: ForecastUpdateModel) {
    return this.http
      .put<ForecastViewModel>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_PUT}${id}`, data)
      .pipe(map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.fahrenheitService.calculateFahrenheit(forecast.temperatureC) })))
      .pipe(catchError(this.handleError));
  }

  public postForecast$(data: ForecastCreateModel) {
    return this.http
      .post<ForecastViewModel>(`${this.baseUrl}${API_ENDPOINTS.FORECAST_POST}`, data)
      .pipe(map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.fahrenheitService.calculateFahrenheit(forecast.temperatureC) })))
      .pipe(catchError(this.handleError));
  }

  public deleteForecast$(id: number): Observable<any> {
    return this.http
      .delete((`${this.baseUrl}${API_ENDPOINTS.FORECAST_DELETE}${id}`))
      .pipe(catchError(this.handleError));
  }

  public deleteSummary$(id: number) {
    return this.http
      .delete((`${this.baseUrl}${API_ENDPOINTS.SUMMARY_DELETE}${id}`))
      .pipe(catchError(this.handleError));
  }

  getSummary$(id: number): Observable<SummaryViewModel> {
    return this.http
      .get<SummaryViewModel>(`${this.baseUrl}${API_ENDPOINTS.SUMMARY_GET}${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
