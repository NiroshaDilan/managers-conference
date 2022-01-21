import {ApprovedMessageModel} from './approved-message-model';

export interface ApprovedMsgResponseModel {
    approvedMessageList: ApprovedMessageModel[]
    currentPage: number,
    totalPages: number,
    totalElements: number
}
