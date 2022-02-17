import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgbCarouselConfig, NgbModal, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {DisplayService} from 'app/core/services/display.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LocalService} from 'app/core/services/local.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
    providers: [NgbCarouselConfig]
})
export class DisplayComponent implements OnInit {

    // imageSrc = 'assets/img/blue-background-vector.jpg';
    imageSrc = 'assets/img/blue-wall.jpg';
    wrap = true;
    // images = [];
    images = [
        {title: 'First Slide', short: 'First Slide Short', src: 'assets/img/blue-background-vector.jpg'},
        {title: 'Second Slide', short: 'Second Slide Short', src: 'assets/img/blue-background-vector.jpg'},
        {title: 'Second Slide', short: 'Second Slide Short', src: 'assets/img/blue-background-vector.jpg'}
    ];

    modalRef?: BsModalRef;
    isDisabledprevious: boolean = false;
    isDisabledNext: boolean = false;
    messageList: any = new Array();
    question: any;
    answeredQuestion: any;
    emptyQuestionObj = {
        id: 0,
        message: 'Please send your questions via \n' +
            ' SMS : 076 516 2144',
    }

    constructor(
        private testModal: NgbModal,
        private modalService: BsModalService,
        private displayService: DisplayService,
        private localService: LocalService,
        private spinner: NgxSpinnerService
    ) {
    }

    openQuestions(content: any) {
        this.testModal.open(content, {windowClass: 'my-class'});
        // this.testModal.open(content, {size: 'xl'});
    }


    onSlide(slideEvent: NgbSlideEvent) {
        if (slideEvent.source === NgbSlideEventSource.ARROW_LEFT) {
            this.previous();
        } else if (slideEvent.source === NgbSlideEventSource.ARROW_RIGHT) {
            this.next();
        }
    }

    next() {
        if (!this.isDisabledNext) {
            console.log('next')
            setTimeout(() => {
                this.showNextQuestion();
            }, 50);
        } else {
            // this.wrap = false;
        }
    }

    previous() {
        if (!this.isDisabledprevious) {
            console.log('previous')
            setTimeout(() => {
                this.showPreviousQuestion();
            }, 50);
        }
    }

    ngOnInit(): void {
        this.initDisplay();

    }

    initDisplay() {
        this.answeredQuestion = JSON.parse(this.localService.getItem('AnsweredObj'));

        if (!this.answeredQuestion) {
            console.log('Empty Answered Question');
            this.isDisabledprevious = true;

            this.displayService.getQuestions().subscribe(res => {

                    if (res) {
                        if (res.id !== 0) {
                            let obj = {
                                id: res.id,
                                message: res.message,
                            }
                            this.question = obj;
                        } else {
                            this.question = this.emptyQuestionObj;
                            this.isDisabledNext = true;
                            this.wrap = false;
                        }

                    } else {
                        console.log('ERROR');
                    }


                },
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log(error);
                    }
                });
            console.log('Initial Obj' + this.question);

        } else {
            if (!this.answeredQuestion.checkedPrevious) {
                console.log('Not Empty Answered Question and not previous clicked');
                this.isDisabledprevious = false;

                this.displayService.getQuestions().subscribe(res => {

                        if (res) {
                            if (res.id != 0) {
                                let obj = {
                                    id: res.id,
                                    message: res.message,
                                }
                                this.question = obj;
                                this.isDisabledNext = false;
                            } else {
                                this.question = this.emptyQuestionObj;
                                this.isDisabledNext = true;
                                this.wrap = false;
                            }

                        } else {
                            console.log('ERROR');
                        }

                    },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            console.log(error);
                        }
                    });
                console.log('Initial Obj' + this.question);
            } else {
                console.log('Not Empty Answered Question and  previous clicked');
                this.isDisabledprevious = true;
                let obj = {
                    id: this.answeredQuestion.id,
                    message: this.answeredQuestion.message,
                }
                this.question = obj;
            }
        }

    }

    openStartQuestionnaire(template: TemplateRef<any>) {

        this.modalRef = this.modalService.show(template);
        this.spinner.show();
        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            console.log('--------------------');
            this.initDisplay();

        }, 1000);


    }

    showPreviousQuestion() {
        console.log('clicked Previous');

        console.log('Load Answered Question' + this.answeredQuestion);
        this.isDisabledprevious = true;
        let obj = {
            id: this.answeredQuestion.id,
            message: this.answeredQuestion.message,
        }
        this.question = obj;
        // set true for the checked previous value
        this.answeredQuestion.checkedPrevious = true;
        this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
        this.isDisabledNext = false;
    }

    showNextQuestion() {
        console.log('clicked Next');

        // Inital
        if (!this.answeredQuestion) {
            console.log('Initial ----------------------------------');

            let data = {
                'id': this.question.id
            }
            // update API
            this.displayService.updateAnsweredQuestion(data).subscribe(
                (res: any) => {
                    if (res) {
                        if (res.responseCode === '00') {
                            // store answered Question
                            let objAnswered = {
                                id: this.question.id,
                                message: this.question.message,
                                checkedPrevious: false,
                            }
                            this.answeredQuestion = objAnswered;
                            this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
                            console.log('answered Question' + JSON.stringify(this.answeredQuestion));
                            // Get API
                            this.displayService.getQuestions().subscribe(
                                (response: any) => {
                                    console.log(response);

                                    if (response) {
                                        if (response.id !== 0) {
                                            let obj = {
                                                id: response.id,
                                                message: response.message,
                                            }
                                            this.question = obj;
                                            console.log('question obj -----------' + JSON.stringify(this.question));
                                            this.isDisabledprevious = false;
                                        } else {
                                            this.question = this.emptyQuestionObj;
                                            this.isDisabledNext = true;
                                            this.isDisabledprevious = false;
                                            this.wrap = false;
                                        }

                                    } else {
                                        console.log('ERROR');
                                    }

                                },
                                (err: any) => {
                                    if (err instanceof HttpErrorResponse) {
                                        console.log(err)
                                    }
                                });
                        } else {
                            console.log('ERROR');
                        }

                    } else {
                        console.log('ERROR');
                    }

                },
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log('error : ' + error)
                    }
                });

        } else {
            if (!this.answeredQuestion.checkedPrevious) {
                console.log('checkedPrevious FALSE');
                let data = {
                    'id': this.question.id
                }

                //Update API
                this.displayService.updateAnsweredQuestion(data).subscribe(
                    (res: any) => {
                        console.log(res);
                        if (res) {
                            if (res.responseCode == '00') {
                                //store answered Question
                                let objAnswered = {
                                    id: this.question.id,
                                    message: this.question.message,
                                    checkedPrevious: false,
                                }
                                this.answeredQuestion = objAnswered;
                                this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
                                console.log('answered Question' + JSON.stringify(this.answeredQuestion));
                                //Get API
                                this.displayService.getQuestions().subscribe(
                                    (response: any) => {
                                        console.log(response);

                                        if (response) {

                                            if (response.id != 0) {
                                                let obj = {
                                                    id: response.id,
                                                    message: response.message,
                                                }
                                                this.question = obj;
                                                this.isDisabledprevious = false;
                                            } else {
                                                this.question = this.emptyQuestionObj;
                                                this.isDisabledNext = true;
                                                this.isDisabledprevious = false;
                                                this.wrap = false;
                                            }

                                        } else {
                                            console.log('ERROR');
                                        }

                                    },
                                    (err: any) => {
                                        if (err instanceof HttpErrorResponse) {
                                            console.log(err)
                                        }
                                    });
                            } else {
                                console.log('ERROR');
                            }

                        } else {
                            console.log('ERROR');
                        }

                    },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            console.log('error : ' + error)
                        }
                    });

            } else {
                console.log('checkedPrevious TRUE');
                //Get API
                this.displayService.getQuestions().subscribe(
                    (res: any) => {
                        console.log(res);

                        if (res) {

                            if (res.id != 0) {
                                let obj = {
                                    id: res.id,
                                    message: res.message,
                                }
                                this.question = obj;
                                this.isDisabledprevious = false;
                                this.answeredQuestion.checkedPrevious = false;
                                this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
                            } else {
                                this.question = this.emptyQuestionObj;
                                this.isDisabledNext = true;
                                this.isDisabledprevious = false;
                                this.answeredQuestion.checkedPrevious = false;
                                this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
                                this.wrap = false;
                            }

                        } else {
                            console.log('ERROR');
                        }

                    },
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            console.log(err)
                        }
                    });
            }
        }
    }

}
