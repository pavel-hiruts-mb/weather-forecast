import { Routes } from '@angular/router';
import { SummariesComponent } from './components/summaries/summaries.component';
import {SummaryComponent} from './components/summary/summary.component';
import {ForecastsComponent} from './components/forecasts/forecasts.component';
import {ForecastComponent} from './components/forecast/forecast.component';

export const routes: Routes = [
    { path: 'forecasts', component: ForecastsComponent },
    { path: 'forecast/:id/edit', component: ForecastComponent },
    { path: 'forecast/add', component: ForecastComponent },
    { path: 'summary/:id/edit', component: SummaryComponent },
    { path: 'summary/add', component: SummaryComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/forecasts', pathMatch: 'full' }
];
