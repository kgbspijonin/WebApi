import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ForecastService } from '../forecast.service';
import { Forecast } from '../forecast';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forecast-edit',
  templateUrl: './forecast-edit.component.html'
})
export class ForecastEditComponent implements OnInit {

  id!: string;
  forecast!: Forecast;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ForecastService: ForecastService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Forecast()); }
          return this.ForecastService.findById(id);
        })
      )
      .subscribe(forecast => {
          this.forecast = forecast;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.ForecastService.save(this.forecast).subscribe(
      forecast => {
        this.forecast = forecast;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/forecasts']);
        }, 5000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/forecasts']);
  }
}
