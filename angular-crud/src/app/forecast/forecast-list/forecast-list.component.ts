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
    this.search();
  }

  search(): void {
    let forecasts : Forecast[] = []
    axios.get('https://localhost:7152/WeatherForecast').then( function (response) {
      response.data.forEach(element => {
        let newobj = new Forecast()
        newobj.id = element.id;
        newobj.date = element.date;
        newobj.temperaturec = element.temperatureC;
        newobj.summary = element.summary;
        newobj.cityid = element.cityId;
        forecasts.push(newobj);
      });
    })
    this.ForecastService.load(this.filter, forecasts);
  }

  select(selected: Forecast): void {
    this.selectedforecast = selected;
  }

  delete(forecast: Forecast): void {
    if (confirm('Are you sure?')) {
      this.ForecastService.delete(forecast).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
