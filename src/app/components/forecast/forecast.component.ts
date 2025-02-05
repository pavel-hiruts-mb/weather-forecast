import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {SummaryViewModel} from '../../interfaces/summary-view-model';
import {ForecastUpdateModel} from '../../interfaces/forecast-update-model';
import {ForecastViewModel} from '../../interfaces/forecast-view-model';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import {IdShareService} from '../../services/id-share/id-share.service';
import {FahrenheitService} from '../../services/fahrenheit/fahrenheit.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelect} from '@angular/material/select';
import moment, { Moment } from 'moment';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-forecast',
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelect, MatOption, MatButton
  ],
  templateUrl: './forecast.component.html',
  providers: [provideMomentDateAdapter()],
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {

  formGroup: FormGroup | undefined;
  summaries$: Observable<SummaryViewModel[]>;
  id: number | undefined;
  forecast$: Observable<ForecastViewModel> | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    route: ActivatedRoute,
    private idShareService: IdShareService,
    private fahrenheitService: FahrenheitService) {
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

    this.formGroup?.markAllAsTouched();

    const value = this.formGroup?.value;
    let date = value.date;
    if (this.isMoment(date))
    {
      date = date.format('YYYY-MM-DD');
    }

    console.log(value);

    const model: ForecastUpdateModel = {
      date: date,
      temperatureC: value.temperatureC,
      summaryId: value.summaryId,
    }

    if (this.id !== undefined) {
      this.apiService
        .putForecast$(this.id, model)
        .subscribe(editedForecast => {
          this.idShareService.setId(editedForecast.id);
          this.router.navigate(['/forecasts'])
        })
    } else {
      this.apiService
        .postForecast$(model)
        .subscribe(newForecast => {
          this.idShareService.setId(newForecast.id);
          this.router.navigate(['/forecasts'])
        })
    }
  }

  onCancel() {
    if (this.id !== undefined) {
      this.idShareService.setId(this.id);
    }

    this.router.navigate(['/forecasts']);
  }

  createFormGroup(forecast: ForecastViewModel | undefined){
    this.formGroup = new FormGroup({
      date: new FormControl(forecast?.date, Validators.required),
      temperatureC: new FormControl(forecast?.temperatureC, Validators.required),
      temperatureF: new FormControl({value:forecast?.temperatureF, disabled: true}),
      summaryId: new FormControl(forecast?.summary.id, Validators.required),
      created: new FormControl({value:forecast?.created, disabled: true}),
      modified: new FormControl({value:forecast?.modified, disabled: true}),
    });

    let tmpC = this.formGroup?.get('temperatureC');
    let tmpF = this.formGroup?.get('temperatureF');

    tmpC?.valueChanges.subscribe(temperatureC => {
      tmpF?.setValue(this.fahrenheitService.calculateFahrenheit(temperatureC), {emitEvent: false});
    });
  }

  isMoment(obj: any): obj is Moment {
    return moment.isMoment(obj);
  }
}
