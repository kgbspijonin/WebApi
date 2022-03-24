import { Component, OnInit } from '@angular/core';
import { ForecastFilter } from '../forecast-filter';
import { ForecastService } from '../forecast.service';
import { Forecast } from '../forecast';
import axios, { Axios } from 'axios';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast-list.component.html'
})

export class ForecastListComponent implements OnInit {
  filter = new ForecastFilter();
  selectedforecast!: Forecast;
  feedback: any = {};

  get forecastList(): Forecast[] {
    return this.ForecastService.forecastList;
  }

  constructor(private ForecastService: ForecastService) {

  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.ForecastService.load(this.ForecastService.fetchForecasts());
  }

  search(): void {
    this.ForecastService.search(this.filter);
  }

  select(selected: Forecast): void {
    this.selectedforecast = selected;
  }

  delete(forecast: Forecast): void {
    if (confirm('Are you sure?')) {
      this.ForecastService.delete(forecast).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'}; },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
