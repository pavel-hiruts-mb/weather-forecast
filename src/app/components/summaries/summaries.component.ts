import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {IdShareService} from '../../services/id-share/id-share.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-summaries',
  imports: [
    FormsModule,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.css'
})
export class SummariesComponent implements OnInit {

  headers: string[] = ['Summary', 'Created', 'Modified'];
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
