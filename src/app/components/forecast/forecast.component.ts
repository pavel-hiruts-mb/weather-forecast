import {Component, OnInit} from '@angular/core';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {ApiService} from '../../services/api/api.service';
import {map} from 'rxjs/operators';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {UpdateSummaryModel} from '../../interfaces/update-summary-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {MatOption, MatSelect} from '@angular/material/select';
import {SummaryViewModel} from '../../interfaces/summary-view-model';

@Component({
  selector: 'app-forecast',
  imports: [
    DatePipe,
    DecimalPipe,
    NgForOf,
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    MatHeaderCellDef,
    MatSelect,
    MatOption
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {

  forecasts: ForecastViewModel[] = [];
  summaries: SummaryViewModel[] = [];
  displayedColumns: string[] = ['date', 'celsius', 'fahrenheit', 'summary', 'created', 'modified', 'actions'];
  editingIndex: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getForecast$()
      .pipe(map(forecasts => forecasts.map(forecast => ({ ...forecast, temperatureF: forecast.temperatureF = this.calculateFahrenheit(forecast.temperatureC) }))))
      .subscribe(response => { this.forecasts = response; })
    this.apiService
      .getSummaries$()
      .subscribe(response => {
        this.summaries = response;
      });
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit(data: ForecastViewModel) {
    let id = data.id;
    console.log(id);
    let updateModel: ForecastUpdateModel = {
      date: data.date,
      temperatureC: data.temperatureC,
      summaryId: data.summary.id
    };
    this.apiService
      .putForecast$(id, updateModel)
      .subscribe(response => {
        console.log(this.forecasts);
        let index = this.forecasts.findIndex(s => s.id === id);
        this.forecasts[index] = response;
      })
    this.editingIndex = null;
  }

  private calculateFahrenheit(celsius: number): number {
    return 32 + (celsius / 0.5556);
  }
}
