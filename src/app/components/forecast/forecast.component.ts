import {Component} from '@angular/core';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {ApiService} from '../../services/api/api.service';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-forecast',
  imports: [
    DatePipe,
    DecimalPipe,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {

  headers: string[] = ['Date', '°C', '°F', 'Summary', 'Created', 'Modified', 'Actions'];
  forecasts$: Observable<ForecastViewModel[]>;

  constructor(
    apiService: ApiService,
    private router: Router) {
    this.forecasts$ = apiService.getForecasts$();
  }

  addData() {

  }

  remove(id: number) {

  }

  edit(id: number) {
    this.router.navigate([`/forecast/${id}/edit`])
  }
}
