import { Routes } from '@angular/router';
import { SummariesComponent } from './components/summaries/summaries.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastEditComponent } from './components/forecast-edit/forecast-edit.component';
import {SummaryComponent} from './components/summary/summary.component';

export const routes: Routes = [
    { path: 'forecasts', component: ForecastComponent },
    { path: 'forecast/:id/edit', component: ForecastEditComponent },
    { path: 'forecast/add', component: ForecastEditComponent },
    { path: 'summary/:id/edit', component: SummaryComponent },
    { path: 'summary/add', component: SummaryComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/forecasts', pathMatch: 'full' }
];
