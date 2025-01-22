import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-forecast-edit',
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './forecast-edit.component.html',
  styleUrl: './forecast-edit.component.css'
})
export class ForecastEditComponent implements OnInit {

  formGroup: FormGroup | undefined;
  summaries$: Observable<SummaryViewModel[]>;
  id: number;
  forecast$: Observable<ForecastViewModel> | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    route: ActivatedRoute,) {
    this.id = route.snapshot.params['id'];
    if (this.id !== undefined){
      this.forecast$ = apiService.getForecast$(this.id);
    }

    this.summaries$ = apiService.getSummaries$();
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.forecast$?.subscribe(forecast => {
        this.createFormGroup(forecast);
      });
    }else{
      this.createFormGroup(undefined);
    }
  }

  onSubmit() {
    const value = this.formGroup?.value;
    const model: ForecastUpdateModel = {
      date: value.date,
      temperatureC: value.temperatureC,
      summaryId: value.summaryId,
    }
    if (this.id !== undefined) {
      this.apiService
        .putForecast$(this.id, model)
        .subscribe(() => {
          this.router.navigate(['/forecasts'])
        })
    }else{
      this.apiService
        .postForecast$(model)
        .subscribe(() => {
          this.router.navigate(['/forecasts'])
        })
    }
  }

  onCancel() {
    this.router.navigate(['/forecasts']);
  }

  createFormGroup(forecast: ForecastViewModel | undefined){
    this.formGroup = new FormGroup({
      date: new FormControl(forecast?.date, Validators.required),
      temperatureC: new FormControl(forecast?.temperatureC, Validators.required),
      temperatureF: new FormControl(forecast?.temperatureF),
      summaryId: new FormControl(forecast?.summary.id, Validators.required),
      created: new FormControl(forecast?.created),
      modified: new FormControl(forecast?.modified),
    });

    let tmpC = this.formGroup?.get('temperatureC');
    let tmpF = this.formGroup?.get('temperatureF');

    tmpC?.valueChanges.subscribe(temperatureC => {
      tmpF?.setValue(this.convertToFahrenheit(temperatureC), {emitEvent: false});
    });
  }

  convertToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}
