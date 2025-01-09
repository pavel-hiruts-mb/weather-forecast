import { Routes } from '@angular/router';
import { WeatherforecastComponent } from './components/weatherforecast/weatherforecast.component';
import { SummariesComponent } from './components/summaries/summaries.component';

export const routes: Routes = [
    { path: 'weatherforecast', component: WeatherforecastComponent },
    { path: 'summaries', component: SummariesComponent },
    { path: '', redirectTo: '/weatherforecast', pathMatch: 'full' }
];
