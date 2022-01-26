import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';
import {AppConfig} from '../../configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class DisplayService {

    constructor(private http: HttpClient,
                private appConfig: AppConfig) {
    }

    getQuestions(): Observable<any> {
        return this.http.get(this.appConfig.API.MESSAGES_VIEW);
    }

    updateAnsweredQuestion(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.appConfig.API.MESSAGES_ANSWERED, JSON.stringify(data), {headers: headers})
    }
}
