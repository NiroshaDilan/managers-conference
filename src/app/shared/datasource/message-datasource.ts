import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MessageModel} from '../models/message-model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MessageService} from '../../core/services/message.service';
import {catchError, finalize} from 'rxjs/operators';
import {MessageResponseModel} from '../models/message-response-model';

export class MessageDatasource implements DataSource<MessageModel> {

    private messageSubject = new BehaviorSubject<MessageModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private messageService: MessageService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<MessageModel[]> {
        return this.messageSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.messageSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadMessages(pageNumber = 0, pageSize = 2) {
        this.loadingSubject.next(true);
        this.messageService.getMessages({page: pageNumber, size: pageSize})
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: MessageResponseModel) => {
                    this.messageSubject.next(result.messageDetailsList);
                this.countSubject.next(7); // todo need total elements
            });
    }

}
