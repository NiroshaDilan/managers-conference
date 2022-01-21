import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RecentUploadedModel} from '../shared/models/recent-uploaded-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MessageService} from '../core/services/message.service';
import {MessageDatasource} from '../shared/datasource/message-datasource';
import {tap} from 'rxjs/operators';
import {MessageModel} from '../shared/models/message-model';
import {ApprovedMessageModel} from '../shared/models/approved-message-model';
import {MessageResponseModel} from '../shared/models/message-response-model';
import {ApprovedMsgResponseModel} from '../shared/models/approved-msg-response-model';
import {ApprovedMessageDatasource} from '../shared/datasource/approved-message-datasource';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PriorityModel} from '../shared/models/priority-model';
import {Priority} from '../shared/enum/priority';
import {PriorityRequestModel} from '../shared/models/priority-request-model';
import {NotificationsComponent} from '../shared/notifications/notifications.component';
import {DisplayMessage} from '../shared/enum/display-message';
import {NotificationType} from '../shared/enum/notification-type';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import {Subscription} from 'rxjs';
import {EventService} from '../core/services/event.service';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {Icons} from '../shared/enum/icons';
import {MessageBoxService} from '../core/services/message-box.service';

@Component({
    selector: 'app-approved',
    templateUrl: './approved.component.html',
    styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

    messageSubscription: Subscription;
    messageDataSource: ApprovedMessageDatasource;
    prioritySet = new Set<PriorityModel>();
    priorityMap = new Map<number, PriorityModel>();
    priorityRequestModel: PriorityRequestModel;
    priorityObj: { id: any };
    priority = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 5, 10, 25, 100];
    displayedColumns: string[] = ['details', 'message', 'sequence'];
    dataSource: MatTableDataSource<ApprovedMessageModel> = new MatTableDataSource();

    priorityOptions = ['High', 'Medium', 'Low'];

    priorityConfig = {
        displayKey: 'description',
        height: 'auto',
        placeholder: 'Priority',
        customComparator: () => {
        },
        limitTo: 0,
        clearOnSelection: true,
        inputDirection: 'ltr'
    }

    seqDropdownConfig = {
        displayKey: 'description',
        height: 'auto',
        placeholder: 'Sequence',
        customComparator: () => {
        },
        limitTo: 0,
        clearOnSelection: true,
        inputDirection: 'ltr'
    }

    sequenceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    priorities = [{id: 1, level: 'High'},
        {id: 1, level: 'Medium'},
        {id: 1, level: 'Low'}]

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private modalService: BsModalService,
                private messageService: MessageService,
                private eventService: EventService,
                private notification: NotificationsComponent,
                private messageBoxService: MessageBoxService,
                private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.loadApprovedMessages();
    }

    loadApprovedMessages() {
        this.messageService.getApprovedMessages(this.currentPage, this.pageSize)
            .subscribe((result) => {
                result.approvedMessageList.map(value => {
                    if (value.priority1 === 1) {
                        value['priorityLevel'] = 'High'
                    } else if (value.priority1 === 2) {
                        value['priorityLevel'] = 'Medium'
                    } else {
                        value['priorityLevel'] = 'Low'
                    }
                });
                result.approvedMessageList.map(value => {
                    value['details'] = value.phoneNo + ' / ' + value.hrBranch;
                });
                this.dataSource.data = result.approvedMessageList;
                setTimeout(() => {
                    this.paginator.pageIndex = this.currentPage;
                    this.paginator.length = result.totalElements;
                });
            });
    }

    pageChanged(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadApprovedMessages();
    }

    public selected(value: any): void {
    }

    priorityOnChange(priority: any, element: ApprovedMessageModel, sequence: any) {
        if (priority.value.length !== 0 && sequence.selectedItems.length !== 0) {
            this.priorityMap.set(element.id, new PriorityModel(element.id, Priority[priority.value], sequence.selectedItems[0]));
        } else {
            this.messageBoxService.showWarningMessage(DisplayMessage.SELECT_SEQUENCE_OR_PRIORITY);
        }
    }

    sequenceOnChange(sequence: any, element: ApprovedMessageModel, priority: any) {
        if (sequence.value.length !== 0 && priority.selectedItems.length !== 0) {
            this.priorityMap.set(element.id, new PriorityModel(element.id, Priority[priority.selectedItems[0]], sequence.value));
        } else {
            this.messageBoxService.showWarningMessage(DisplayMessage.SELECT_SEQUENCE_OR_PRIORITY);
        }
    }

    submit() {
        const modelArray: PriorityModel[] = [];
        if (this.priorityMap.size !== 0) {
            this.priorityMap.forEach((value: PriorityModel, key: number) => {
                modelArray.push(value);
            });
            let requestModel = new PriorityRequestModel(modelArray);

            this.messageService.saveApprovedPriority(requestModel)
                .subscribe(res => {
                    this.loadApprovedMessages();
                    requestModel = null;
                    this.priorityMap.clear();
                    this.messageBoxService.showSuccessMessage(DisplayMessage.SUCCESSFULLY_SAVED);
                });
        } else {
            this.messageBoxService.showWarningMessage(DisplayMessage.NO_CHANGES);
        }

    }

    refresh() {
        this.loadApprovedMessages();
    }

}
