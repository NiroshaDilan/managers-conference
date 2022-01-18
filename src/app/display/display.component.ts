import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DisplayService } from 'app/core/services/display.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalService } from 'app/core/services/local.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [NgbCarouselConfig]
})
export class DisplayComponent implements OnInit {

  modalRef?: BsModalRef;
  isDisabledprevious: boolean = false;
  isDisabledNext: boolean = false;
  messageList: any = new Array();
  question: any;
  answeredQuestion: any;
  emptyQuestionObj = {
    id: 0,
    message: 'Approved Messages are completed',
  }

  constructor(
    private modalService: BsModalService,
    private displayService: DisplayService,
    private localService: LocalService
  ) {
  }

  ngOnInit(): void {

    this.answeredQuestion = JSON.parse(this.localService.getItem('AnsweredObj'));

    if (!this.answeredQuestion) {
      console.log('Empty Answered Question');
      this.isDisabledprevious = true;

      this.displayService.getQuestions().subscribe(res => {

        if (res) {
          if (res.id != 0) {
            let obj = {
              id: res.id,
              message: res.message,
            }
            this.question = obj;
          } else {
            this.question = this.emptyQuestionObj;
            this.isDisabledNext = true;
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
            } else {
              this.question = this.emptyQuestionObj;
              this.isDisabledNext = true;
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
    console.log(this.question.message);
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
    //set true for the checked previous value
    this.answeredQuestion.checkedPrevious = true;
    this.localService.setItem('AnsweredObj', JSON.stringify(this.answeredQuestion));
    this.isDisabledNext = false;
  }

  showNextQuestion(id: String) {
    console.log('clicked Next');

    //Inital
    if (!this.answeredQuestion) {
      console.log('Initial ----------------------------------');

      let data = {
        "id": this.question.id
      }
      //update API
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
                      console.log('question obj -----------' + JSON.stringify(this.question));
                      this.isDisabledprevious = false;
                    } else {
                      this.question = this.emptyQuestionObj;
                      this.isDisabledNext = true;
                      this.isDisabledprevious = false;
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
              console.log("ERROR");
            }

          } else {
            console.log("ERROR");
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
          "id": this.question.id
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
                console.log("ERROR");
              }

            } else {
              console.log("ERROR");
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
