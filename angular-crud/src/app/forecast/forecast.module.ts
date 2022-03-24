import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastEditComponent } from './forecast-edit/forecast-edit.component';
import { ForecastService } from './forecast.service';
import { forecast_ROUTES } from './forecast.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(forecast_ROUTES)
  ],
  declarations: [
    ForecastListComponent,
    ForecastEditComponent
  ],
  providers: [ForecastService],
  exports: []
})
export class ForecastModule { }
