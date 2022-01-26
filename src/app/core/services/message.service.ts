import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../configs/app-config';
import {Observable} from 'rxjs';
import {MessageResponseModel} from '../../shared/models/message-response-model';
import {PriorityRequestModel} from '../../shared/models/priority-request-model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private httpClient: HttpClient,
                private appConfig: AppConfig) {
    }

    getMessages(params): Observable<MessageResponseModel> {
        return this.httpClient.post<any>(this.appConfig.API.LOAD_MESSAGES, params);
    }

    getApprovedMessages(page = 0, size = 3): Observable<any> {
        const params = {
            page: page,
            size: size
        }
        return this.httpClient.post(this.appConfig.API.LOAD_APPROVED, params);
    }

    saveApprovedMessages(params): Observable<any> {
        return this.httpClient.post(this.appConfig.API.SAVE_APPROVED, params);
    }

    saveApprovedPriority(params: PriorityRequestModel): Observable<any> {
        console.log(params);
        return this.httpClient.post(this.appConfig.API.SAVE_PRIORITY, params);
    }
}
