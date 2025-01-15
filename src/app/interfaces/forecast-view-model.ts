import {SummaryViewModel} from './summary-view-model';

export interface ForecastViewModel {
    id: number;
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: SummaryViewModel;
    created: string;
    modified: string;
  }
