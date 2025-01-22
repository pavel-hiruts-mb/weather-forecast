import { Routes } from '@angular/router';
import { SummariesComponent } from './components/summaries/summaries.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastEditComponent } from './components/forecast-edit/forecast-edit.component';

export const routes: Routes = [
    { path: 'forecasts', component: ForecastComponent },
    { path: 'forecast/:id/edit', component: ForecastEditComponent },
    { path: 'forecast/add', component: ForecastEditComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/forecasts', pathMatch: 'full' }
];
