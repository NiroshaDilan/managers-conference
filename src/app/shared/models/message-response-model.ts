import {MessageModel} from './message-model';

export interface MessageResponseModel {
    messageDetailsList: MessageModel[]
    currentPage: number,
    totalPages: number
}
