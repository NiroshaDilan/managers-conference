import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    loadApprovedMessageSubject = new Subject<string>();

}
