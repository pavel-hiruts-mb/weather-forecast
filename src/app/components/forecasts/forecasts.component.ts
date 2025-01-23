import {Component, OnInit} from '@angular/core';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {ApiService} from '../../services/api/api.service';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {IdShareService} from '../../services/id-share/id-share.service';

@Component({
  selector: 'app-forecasts',
  imports: [
    DatePipe,
    DecimalPipe,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './forecasts.component.html',
  styleUrl: './forecasts.component.css'
})
export class ForecastsComponent implements OnInit {

  headers: string[] = ['Date', '°C', '°F', 'Summary', 'Created', 'Modified'];
  forecasts$: Observable<ForecastViewModel[]>;
  selectedForecastId: number | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    public idShareService: IdShareService) {
    this.forecasts$ = apiService.getForecasts$();
  }

  ngOnInit(): void {
    this.selectRow(this.idShareService.getId());
    this.idShareService.setId(undefined);
    }

  addData() {
    this.idShareService.setId(this.selectedForecastId);
    this.router.navigate(['/forecast/add']);
  }

  remove() {
    if (this.selectedForecastId === undefined) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService
          .deleteForecast$(this.selectedForecastId!)
          .subscribe(() => {
            this.selectedForecastId = undefined;
            this.forecasts$ = this.apiService.getForecasts$();
          })
      }
    });
  }

  edit() {
    if (this.selectedForecastId === undefined) return;
    this.router
      .navigate([`/forecast/${this.selectedForecastId}/edit`]);
  }

  selectRow(id: number | undefined): void {
    this.selectedForecastId = id;
  }
}
