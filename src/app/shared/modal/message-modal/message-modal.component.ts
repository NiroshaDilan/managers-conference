import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MessageModel} from '../../models/message-model';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit, OnChanges {

  // @Input('dataFromParent') public modalRef: BsModalRef;
     element: MessageModel;

  constructor(private modalService: BsModalService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    console.log(this.element);
  }

  close() {
    this.bsModalRef.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.element);
  }

}
