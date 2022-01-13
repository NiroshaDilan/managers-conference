import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../configs/app-config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient,
              private appConfig: AppConfig) {
  }

  getMessages(): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.API.LOAD_MESSAGES);
  }
}
