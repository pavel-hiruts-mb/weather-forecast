import { Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { SummariesComponent } from './components/summaries/summaries.component';

export const routes: Routes = [
    { path: 'weather-forecast', component: WeatherForecastComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/weather-forecast', pathMatch: 'full' }
];
