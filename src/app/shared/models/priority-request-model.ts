import {PriorityModel} from './priority-model';

export class PriorityRequestModel {
    prioritizeList: PriorityModel[];

    constructor(prioritizeList: PriorityModel[]) {
        this.prioritizeList = prioritizeList;
    }
}
