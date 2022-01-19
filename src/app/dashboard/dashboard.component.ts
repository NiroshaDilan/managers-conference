import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {RecentUploadedModel} from '../shared/models/recent-uploaded-model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MessageService} from '../core/services/message.service';
import {MessageDatasource} from '../shared/datasource/message-datasource';
import {tap} from 'rxjs/operators';
import {MessageModel} from '../shared/models/message-model';
import {MessageResponseModel} from '../shared/models/message-response-model';
import {MessageModalComponent} from '../shared/modal/message-modal/message-modal.component';
import {Priority} from '../shared/enum/priority';

const ELEMENT_DATA: RecentUploadedModel[] = [
    {
        detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, ' +
            'and other people who use this device won’t see your activity. ' +
            'However, downloads, bookmarks and reading list items will be saved.', frequency: 'cycle'
    },
    {
        detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, and other people who ' +
            'use this device won’t see your activity. ' +
            'However, downloads, bookmarks and reading list items will be saved.', frequency: 'cycle'
    }
];


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    totalRows = 0;
    priority = 0;
    pageSize = 2;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    messageDataSource: MessageDatasource;
    public items: Array<string> = ['High', 'Medium', 'Low'];
    priorityOptions = ['High', 'Medium', 'Low'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    config = {
        displayKey: 'description',
        height: 'auto',
        placeholder: 'Priority',
        customComparator: () => {
        },
        limitTo: 0,
        clearOnSelection: true,
        inputDirection: 'ltr'
    }

    displayedColumns: string[] = ['mobileNo', 'message', 'action'];
    dataSource: MatTableDataSource<MessageModel> = new MatTableDataSource();

    public modalRef: BsModalRef;

    constructor(private modalService: BsModalService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.messageDataSource = new MessageDatasource(this.messageService);
        this.messageDataSource.loadMessages();
    }

    ngAfterViewInit() {
        this.messageDataSource.counter$
            .pipe(
                tap((count) => {
                    this.paginator.length = count;
                })
            )
            .subscribe();

        this.paginator.page
            .pipe(
                tap(() => this.loadMessages())
            )
    }

    approve(element: MessageModel, priorityObj: any) {
        this.submit(element.id, 'APPROVED', priorityObj.selectedItems[0])
    }

    reject(element: MessageModel, priorityObj: any) {
        this.submit(element.id, 'REJECTED', priorityObj.selectedItems[0])
    }

    submit(messageId: number, status: string, priority: string) {

        priority = status === 'REJECTED' ? '0' : priority;
        if (priority !== undefined) {
            const model = {
                id: messageId,
                status: status,
                priority: Priority[priority]
            }

            this.messageService.saveApprovedMessages(model)
                .subscribe(res => {
                    console.log(res);
                    this.loadMessages();
                });
        } else {
            console.log('Please select the priority');
        }
    }

    loadMessages() {
        // this.messageDataSource.loadMessages(this.paginator.pageIndex, this.paginator.pageSize);
        this.messageService.getMessages({page: this.currentPage, size: this.pageSize})
            .subscribe((result: MessageResponseModel) => {
                this.dataSource.data = result.messageDetailsList;
                setTimeout(() => {
                    this.paginator.pageIndex = this.currentPage;
                    this.paginator.length = 7;
                });
            });
    }

    pageChanged(event: PageEvent) {
        this.messageDataSource.loadMessages(event.pageIndex, event.pageSize);
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    priorityOnChange(priority: any) {
        console.log(priority);
    }

    viewMessage(modalTemplate: TemplateRef<any>, element: MessageModel) {
        const initialState = {
            element: element
        }
        this.modalRef = this.modalService.show(MessageModalComponent, {
            initialState: initialState,
            class: 'modal-dialogue-centered modal-lg',
            backdrop: 'static',
            keyboard: true
        });
        this.modalRef.content.closeBtnName = 'Close';
    }
}
