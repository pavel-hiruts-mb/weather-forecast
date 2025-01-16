import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {UpdateSummaryModel} from '../../interfaces/update-summary-model';
import {DatePipe, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';

@Component({
  selector: 'app-summaries',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    NgIf,
    FormsModule,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    DatePipe
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.css'
})
export class SummariesComponent implements OnInit {

  dataSource = new MatTableDataSource<SummaryViewModel>();
  displayedColumns: string[] = ['text', 'created', 'modified', 'actions'];
  editingIndex: number | null = null;

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.apiService
      .getSummaries$()
      .subscribe(response => {
        this.dataSource.data = response;
      });
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit(id: number, text: string) {
    let data: UpdateSummaryModel = { text: text };
    this.apiService
      .putSummary$(id, data)
      .subscribe(response => {
        let index = this.dataSource.data.findIndex(s => s.id === id);
        this.dataSource.data[index] = response;
        this.dataSource.data = [...this.dataSource.data]
        this.changeDetectorRef.detectChanges();
      })
    this.editingIndex = null;
  }
}
