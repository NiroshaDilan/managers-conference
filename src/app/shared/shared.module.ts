import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { NotificationsComponent } from './notifications/notifications.component';
import { SuccessMessageComponent } from './message-box/success-message/success-message.component';
import { ErrorMessageComponent } from './message-box/error-message/error-message.component';
import { WarningMessageComponent } from './message-box/warning-message/warning-message.component';

@NgModule({
    declarations: [
        MessageModalComponent,
        NotificationsComponent,
        SuccessMessageComponent,
        ErrorMessageComponent,
        WarningMessageComponent
    ],
    exports: [
        MessageModalComponent,
        NotificationsComponent
    ],
    imports: [
        CommonModule,
        ModalModule
    ]
})
export class SharedModule { }
