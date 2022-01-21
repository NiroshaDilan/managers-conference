export interface ApprovedMessageModel {
    id: number;
    phoneNo: string;
    senderName: string;
    message: string;
    hrBranch: string;
    approvedDateTime: string;
    priority1: number;
    priority2: number;
    prioratizedDateTime: string;
    readStatus: string;
}
