import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RecentUploadedModel} from '../shared/models/recent-uploaded-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

const ELEMENT_DATA: RecentUploadedModel[] = [
    {
        detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, ' +
            'and other people who use this device won’t see your activity.' +
            ' and other people who use this device won’t see your activity. and other people who use this ' +
            'device won’t see your activity. and other people who use this device won’t see your activity. and other people who use ' +
            'this device won’t see your activity. and other people who use this device won’t see your activity. and other ' +
            'people who use this device won’t see your activity. and other people who use this device won’t see your activity. and other ' +
            'people who use this device won’t see your activity. and other people who use this device won’t see your activity. and other' +
            ' people who use this device won’t see your activity. and other people who use this device won’t see your activity. and other ' +
            'people who use this device won’t see your activity.' +
            ' and other people who use this device won’t see your activity.' +
            'However, downloads, bookmarks and reading list items will be saved.', frequency: 'cycle'
    },
    {
        detail: '071123456789/Kandy Branch', message: 'Now you can browse privately, and other people who ' +
            'use this device won’t see your activity. ' +
            'However, downloads, bookmarks and reading list items will be saved.', frequency: 'cycle'
    }
];

@Component({
    selector: 'app-approved',
    templateUrl: './approved.component.html',
    styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['detail', 'message', 'sequence'];
    dataSource = new MatTableDataSource<RecentUploadedModel>(ELEMENT_DATA);

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

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    sequenceOnChange(sequence: any) {

    }

    priorityOnChange(priority: any) {

    }

}
