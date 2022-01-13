import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  public static URL_APP_BASE: string = environment.appRoot;

  API = {
    LOAD_MESSAGES: AppConfig.URL_APP_BASE + ''
  };
}
