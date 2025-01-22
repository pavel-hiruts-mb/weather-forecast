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
  forecast$: Observable<ForecastViewModel>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    route: ActivatedRoute,) {
    this.id = route.snapshot.params['id'];
    this.forecast$ = apiService.getForecast$(this.id);
    this.summaries$ = apiService.getSummaries$();
  }

  ngOnInit(): void {
    this.forecast$.subscribe(forecast => {
      this.formGroup = new FormGroup({
        date: new FormControl(forecast.date, Validators.required),
        temperatureC: new FormControl(forecast.temperatureC, Validators.required),
        temperatureF: new FormControl(forecast.temperatureF),
        summaryId: new FormControl(forecast.summary.id, Validators.required),
        created: new FormControl(forecast.created),
        modified: new FormControl(forecast.modified),
      });

      let tmpC =  this.formGroup?.get('temperatureC');
      let tmpF =  this.formGroup?.get('temperatureF');

      tmpC?.valueChanges.subscribe(temperatureC => {
        tmpF?.setValue(this.convertToFahrenheit(temperatureC), {emitEvent: false});
      })
    });
  }

  onSubmit() {
    const value = this.formGroup?.value as ForecastUpdateModel;
    console.log(value);
    this.apiService.putForecast$(this.id, {
      date: value.date,
      temperatureC: value.temperatureC,
      summaryId: value.summaryId,
    })
      .subscribe(res => {
        this.router.navigate(['/forecasts'])})
  }

  onCancel() {
    this.router.navigate(['/forecasts']);
  }


  convertToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}
