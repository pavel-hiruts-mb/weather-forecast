import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {UpdateSummaryModel} from '../../interfaces/update-summary-model';
import {DatePipe, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {FormsModule} from '@angular/forms';

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

  summaries: SummaryViewModel[] = [];
  displayedColumns: string[] = ['text', 'created', 'modified', 'actions'];
  editingIndex: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getSummaries$()
      .subscribe(response => {
        this.summaries = response;
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
        let index = this.summaries.findIndex(s => s.id === id);
        console.log(index);
        this.summaries[index] = response;
      })
    this.editingIndex = null;
  }
}
