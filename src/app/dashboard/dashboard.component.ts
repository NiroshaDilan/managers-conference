import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RecentUploadedModel} from '../shared/models/recent-uploaded-model';

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

    displayedColumns: string[] = ['detail', 'message', 'action'];
    dataSource = new MatTableDataSource<RecentUploadedModel>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit(): void {
    }

}
