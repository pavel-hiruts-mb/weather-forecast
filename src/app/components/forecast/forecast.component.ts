import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {ApiService} from '../../services/api/api.service';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {UpdateSummaryModel} from '../../interfaces/update-summary-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
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
    MatOption,
    MatFormField
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {

  summaries: SummaryViewModel[] = [];
  displayedColumns: string[] = ['date', 'celsius', 'fahrenheit', 'summary', 'created', 'modified', 'actions'];
  editingIndex: number | null = null;
  dataSource = new MatTableDataSource<ForecastViewModel>();

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.apiService
      .getForecast$()

      .subscribe(response => {
        this.dataSource.data = response;
      })
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
    let updateModel: ForecastUpdateModel = {
      date: data.date,
      temperatureC: data.temperatureC,
      summaryId: data.summary.id
    };

    this.apiService
      .putForecast$(id, updateModel)
      .subscribe(response => {
        this.dataSource.data[this.getForecastIndex(id)] = response;
        this.dataSource.data = [...this.dataSource.data]
        this.changeDetectorRef.detectChanges();
      })

    this.editingIndex = null;
  }

  updateSummaryId(id: number, summaryId: number) {
    this.dataSource.data[this.getForecastIndex(id)].summary = this.summaries[this.getSummaryIndex(summaryId)];
  }

  private getForecastIndex(id: number): number {
    return this.dataSource.data.findIndex(f => f.id === id);
  }

  private getSummaryIndex(id: number): number {
    return this.summaries.findIndex(f => f.id === id);
  }
}
