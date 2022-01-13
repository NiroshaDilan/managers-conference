import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RecentUploadedModel} from '../shared/models/recent-uploaded-model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

const ELEMENT_DATA: RecentUploadedModel[] = [
    {detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, ' +
            'and other people who use this device won’t see your activity. ' +
            'However, downloads, bookmarks and reading list items will be saved.', frequency: 'cycle'},
    {detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, and other people who ' +
            'use this device won’t see your activity. ' +
            'However, downloads, bookmarks and reading list items will be saved.',  frequency: 'cycle'}
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public items: Array<string> = ['High', 'Medium', 'Low'];

    priorityOptions = ['High', 'Medium', 'Low'];

    config = {
        displayKey: 'description',
        height: 'auto',
        placeholder: 'Priority',
        customComparator: () => {},
        limitTo: 0,
        clearOnSelection: true,
        inputDirection: 'ltr'
    }

    displayedColumns: string[] = ['detail', 'message', 'action'];
    dataSource = new MatTableDataSource<RecentUploadedModel>(ELEMENT_DATA);
    priority  = 'Priority';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    public modalRef: BsModalRef;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private modalService: BsModalService) { }

    ngOnInit(): void {
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    priorityOnChange(priority: any) {
        console.log(priority);
    }

    viewMessage(modalTemplate: TemplateRef<any>) {
        this.modalRef = this.modalService.show(modalTemplate,
            {
                class: 'modal-dialogue-centered modal-lg',
                backdrop: 'static',
                keyboard: true
            }
        );
    }

    dropdownOnClick(selectedPriority: any) {
        this.priority = selectedPriority.target.innerHTML;
        console.log(selectedPriority);
    }
}
