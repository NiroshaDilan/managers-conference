import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  public static URL_APP_BASE: string = environment.appRoot;

  API = {
    LOAD_MESSAGES: AppConfig.URL_APP_BASE + 'messages/retrieve',
    LOAD_APPROVED: AppConfig.URL_APP_BASE + 'approved/retrieve',
    SAVE_APPROVED: AppConfig.URL_APP_BASE + 'messages/persist/approved',
    SAVE_PRIORITY: AppConfig.URL_APP_BASE + 'approved/persist/priority',
    MESSAGES_VIEW: AppConfig.URL_APP_BASE + 'messages/view',
    MESSAGES_ANSWERED: AppConfig.URL_APP_BASE + 'messages/answered'
  };
}
