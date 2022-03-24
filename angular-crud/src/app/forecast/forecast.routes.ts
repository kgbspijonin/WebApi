import { Routes } from '@angular/router';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastEditComponent } from './forecast-edit/forecast-edit.component';

export const forecast_ROUTES: Routes = [
  {
    path: 'forecasts',
    component: ForecastListComponent
  },
  {
    path: 'forecasts/:id',
    component: ForecastEditComponent
  }
];
