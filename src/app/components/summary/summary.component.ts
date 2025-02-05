import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {ApiService} from '../../services/api/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IdShareService} from '../../services/id-share/id-share.service';
import {SummaryUpdateModel} from '../../interfaces/summary-update-model';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-summary',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {

  formGroup: FormGroup | undefined;
  summary$: Observable<SummaryViewModel> | undefined;
  id: number | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    route: ActivatedRoute,
    public idShareService: IdShareService) {
    this.id = route.snapshot.params['id'];
    if (this.id !== undefined){
      this.summary$ = apiService.getSummary$(this.id);
    }
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.summary$?.subscribe(summary => {
        this.createFormGroup(summary);
      });
    }else{
      this.createFormGroup(undefined);
    }
  }

  onSubmit() {
    const value = this.formGroup?.value;
    const model: SummaryUpdateModel = {
      text: value.text,
    }
    if (this.id !== undefined) {
      this.apiService
        .putSummary$(this.id, model)
        .subscribe(editedSummary => {
          this.idShareService.setId(editedSummary.id);
          this.router.navigate(['/summaries'])
        })
    }else{
      this.apiService
        .postSummary$(model)
        .subscribe(newForecast => {
          this.idShareService.setId(newForecast.id);
          this.router.navigate(['/summaries'])
        })
    }
  }

  onCancel() {
    if (this.id !== undefined) {
      this.idShareService.setId(this.id);
    }

    this.router.navigate(['/summaries']);
  }

  createFormGroup(summary: SummaryViewModel | undefined){
    this.formGroup = new FormGroup({
      text: new FormControl(summary?.text, Validators.required),
      created: new FormControl({value:summary?.created, disabled: true}),
      modified: new FormControl({value:summary?.modified, disabled: true}),
    });
  }
}
