import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';

@NgModule({
    declarations: [
        MessageModalComponent
    ],
    exports: [
        MessageModalComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
