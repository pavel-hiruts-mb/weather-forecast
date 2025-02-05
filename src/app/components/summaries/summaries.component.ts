import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {IdShareService} from '../../services/id-share/id-share.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-summaries',
  imports: [
    FormsModule,
    DatePipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.css'
})
export class SummariesComponent implements OnInit {

  columns: string[] = ['text', 'created', 'modified'];
  summaries$: Observable<SummaryViewModel[]>;
  selectedSummaryId: number | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    public idShareService: IdShareService) {
    this.summaries$ = apiService.getSummaries$();
  }

  ngOnInit() {
    this.selectRow(this.idShareService.getId());
    this.idShareService.setId(undefined);
  }

  selectRow(id: number | undefined) {
    this.selectedSummaryId = id;
  }

  addData() {
    this.idShareService.setId(this.selectedSummaryId);
    this.router.navigate(['/summary/add']);
  }

  edit() {
    if (this.selectedSummaryId === undefined) {
      return;
    }

    this.router.navigate([`/summary/${this.selectedSummaryId}/edit`]);
  }

  remove() {
    if (this.selectedSummaryId === undefined) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService
          .deleteSummary$(this.selectedSummaryId!)
          .subscribe(() => {
            this.selectedSummaryId = undefined;
            this.summaries$ = this.apiService.getSummaries$();
          })
      }
    });
  }
}
