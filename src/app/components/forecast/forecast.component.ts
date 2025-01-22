import {Component} from '@angular/core';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {ApiService} from '../../services/api/api.service';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

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
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog) {
    this.forecasts$ = apiService.getForecasts$();
  }

  addData() {
    this.router.navigate(['/forecast/add']);
  }

  remove(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService
          .deleteForecast$(id)
          .subscribe(() => {
            this.forecasts$ = this.apiService.getForecasts$();
          })
      }
    });
  }

  edit(id: number) {
    this.router.navigate([`/forecast/${id}/edit`])
  }
}
