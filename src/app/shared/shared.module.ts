import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        MessageModalComponent
    ],
    exports: [
        MessageModalComponent
    ],
    imports: [
        CommonModule,
        ModalModule
    ]
})
export class SharedModule { }
