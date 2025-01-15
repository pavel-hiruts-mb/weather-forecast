import { Routes } from '@angular/router';
import { SummariesComponent } from './components/summaries/summaries.component';
import {ForecastComponent} from './components/forecast/forecast.component';

export const routes: Routes = [
    { path: 'forecasts', component: ForecastComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/forecasts', pathMatch: 'full' }
];
