import { Component, OnInit } from '@angular/core';

import { QuestionService, AlertService } from '../_services/index';
import { NewChatService } from '../_services/newchat.service';
import { Question } from '../_models/question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  question: Question = {
    id: 1,
    question: "Mi lesz a kerdes?",
    answer1: "Meg senki nem tudja",
    answer2: "Passz",
    answer3: "Valami majd lesz",
    answer4: "Passz",
  };

  _question: Question;

  answer;


  allQuestion: Question[];

  data;
  connection;

  answerClicked: boolean = false;


  constructor(private _questionService: QuestionService,
    private _chatService: NewChatService,
    private _alertService: AlertService) {

  }

  ngOnInit() {
    /*  this.connection = this._chatService.getQuestion().subscribe(question => {
        this._question = question as Question;
        console.log(this._question);
      })
      console.log("game comp init");*/

    this._chatService
      .getQuestion()
      .subscribe(question => {
        this.answer = question;
      });
  }



  btn1() {
    console.log("BTN1");
    //this.answerClicked = true;
  //  this._chatService.sendValasz(1);
    this._alertService.success("1. gomb kivalasztva!");
    this._chatService.sendAnswer(1);
  }
  btn2() {
    console.log("BTN2");
    //this.answerClicked = true;
  //  this._chatService.sendValasz(2);
    this._alertService.success("2. gomb kivalasztva!");
    this._chatService.sendAnswer(2);
  }
  btn3() {
    console.log("BTN3");
    //this.answerClicked = true;
//    this._chatService.sendValasz(3);
    this._alertService.success("3. gomb kivalasztva!");
    this._chatService.sendAnswer(3);
  }
  btn4() {
    console.log("BTN4");
    //this.answerClicked = true;
//    this._chatService.sendValasz(4);
    this._alertService.success("4. gomb kivalasztva!");
    this._chatService.sendAnswer(4);
  }

}
