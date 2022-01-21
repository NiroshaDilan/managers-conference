import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ApprovedMessageModel} from '../models/approved-message-model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MessageService} from '../../core/services/message.service';
import {catchError, finalize} from 'rxjs/operators';
import {ApprovedMsgResponseModel} from '../models/approved-msg-response-model';

export class ApprovedMessageDatasource implements DataSource<ApprovedMessageModel> {
    private approvedMessageSubject = new BehaviorSubject<ApprovedMessageModel[]>([]);
    private approvedLoadingSubject = new BehaviorSubject<boolean>(false);
    private approvedCountSubject = new BehaviorSubject<number>(0);
    public approvedCounter$ = this.approvedCountSubject.asObservable();

    constructor(private messageService: MessageService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<ApprovedMessageModel[]> {
        return this.approvedMessageSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.approvedMessageSubject.complete();
        this.approvedLoadingSubject.complete();
        this.approvedCountSubject.complete();
    }

    loadApprovedMessages(pageNumber = 0, pageSize = 2) {
        this.approvedLoadingSubject.next(true);
        this.messageService.getApprovedMessages()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.approvedLoadingSubject.next(false))
            )
            .subscribe((result: ApprovedMsgResponseModel) => {
                this.approvedMessageSubject.next(result.approvedMessageList);
                this.approvedCountSubject.next(result.totalElements);
            });
    }
}
