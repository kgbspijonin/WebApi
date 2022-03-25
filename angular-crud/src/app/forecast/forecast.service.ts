import { Forecast } from './forecast';
import { ForecastFilter } from './forecast-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import axios, { Axios } from 'axios'
import { filter } from 'rxjs/operators';
import { City } from './city';

@Injectable()
export class ForecastService {

  static Instance : ForecastService

  forecastList: Forecast[] = [];
  fullForecastList: Forecast[] = [];

  cities : City[] = [];

  constructor(private http: HttpClient) {
    ForecastService.Instance = this
  }

  public static GetInstance() : ForecastService {
    return ForecastService.Instance;
  }

  updateCities() {
    this.cities = this.fetchCities()
  }

  fetchCities() : City[] {
    let cities : City[] = []
    axios.get('https://localhost:7152/Cities').then (response => {
      response.data.forEach(element => {
        let newobj = new City()
        newobj.id = element.id
        newobj.name = element.name
        cities.push(newobj)
      });
    })
    return cities
  }

  fetchForecasts() : Forecast[] {
    this.updateCities()
    let forecasts : Forecast[] = []
    axios.get('https://localhost:7152/WeatherForecast').then( response => {
      response.data.forEach(element => {
        let newobj = new Forecast()
        newobj.id = element.id;
        newobj.date = element.date;
        newobj.temperaturec = element.temperatureC;
        newobj.summary = element.summary;
        newobj.cityid = element.cityId;
        newobj.cityname = this.cities.filter(x => x.id == element.cityId)[0].name
        forecasts.push(newobj);
      });
    })
    console.log(forecasts)
    return forecasts
  }

  findById(id: string): Observable<Forecast> {
    const url = `https://localhost:7152/WeatherForecast/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Forecast>(url, {params, headers});
  }

  reloadForecasts() {
    this.fullForecastList.forEach(element => {
      this.forecastList.push(element)
    });
  }

  load(forecasts: Forecast[]): void {
    this.fullForecastList = forecasts
    this.reloadForecasts()
  }

  search(filter: ForecastFilter) {
    this.forecastList = []
    if(!filter || (!filter.cityid && !filter.cityname)) {
      this.reloadForecasts();
    }
    else {
      this.forecastList = this.fullForecastList
      if(filter.cityid) {
        this.forecastList = this.forecastList.filter(x => x.cityid.toString().includes(filter.cityid))
      }
      if(filter.cityname) {
        this.forecastList = this.forecastList.filter(x => x.cityname.toLowerCase().includes(filter.cityname))
      }
    }
  }

  find(filter: ForecastFilter): Observable<Forecast[]> {
    const url = `https://localhost:7152/WeatherForecast/`;
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
      url = `https://localhost:7152/WeatherForecast/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      var result = this.http.put<Forecast>(url, entity, {headers, params});
      this.load(this.fetchForecasts());
      return result;
    } else {
      url = `https://localhost:7152/WeatherForecast/`;
      var result = this.http.post<Forecast>(url, entity, {headers, params});
      this.load(this.fetchForecasts());
      return result;
    }
  }

  delete(entity: Forecast): Observable<Forecast> {
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `https://localhost:7152/WeatherForecast/${entity.id.toString()}`;
      var result = this.http.delete<Forecast>(url, {headers})
      result.subscribe( x => { this.load(this.fetchForecasts()) })
      return result;
    }
    return EMPTY;
  }
}
