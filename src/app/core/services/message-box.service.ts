import { Injectable } from '@angular/core';
import {WarningMessageComponent} from '../../shared/message-box/warning-message/warning-message.component';
import {SuccessMessageComponent} from '../../shared/message-box/success-message/success-message.component';
import {ErrorMessageComponent} from '../../shared/message-box/error-message/error-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private warningComponent: WarningMessageComponent,
              private successComponent: SuccessMessageComponent,
              private errorComponent: ErrorMessageComponent) { }

  showWarningMessage( message = 'warning', from = 'top', align = 'right') {
    this.warningComponent.showNotification(from, align, message)
  }

  showSuccessMessage(message = 'success', from = 'top', align = 'right') {
    this.successComponent.showNotification(from, align, message)
  }

  showErrorMessage(message = 'error', from = 'top', align = 'right') {
    this.errorComponent.showNotification(from, align, message)
  }
}
