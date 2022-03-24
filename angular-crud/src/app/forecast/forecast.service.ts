import { Forecast } from './forecast';
import { ForecastFilter } from './forecast-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import axios, { Axios } from 'axios'

@Injectable()
export class ForecastService {
  forecastList: Forecast[] = [];

  constructor(private http: HttpClient) {
    
  }

  findById(id: string): Observable<Forecast> {
    const url = `http://www.angular.at/api/forecast/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Forecast>(url, {params, headers});
  }

  load(filter: ForecastFilter, forecasts: Forecast[]): void {
    this.forecastList = forecasts
  }

  find(filter: ForecastFilter): Observable<Forecast[]> {
    const url = `http://www.angular.at/api/forecast`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
      'cityid': filter.cityid
    };

    return this.http.get<Forecast[]>(url, {params, headers});
  }

  save(entity: Forecast): Observable<Forecast> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/forecast/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Forecast>(url, entity, {headers, params});
    } else {
      url = `http://www.angular.at/api/forecast`;
      return this.http.post<Forecast>(url, entity, {headers, params});
    }
  }

  delete(entity: Forecast): Observable<Forecast> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/forecast/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Forecast>(url, {headers, params});
    }
    return EMPTY;
  }
}
