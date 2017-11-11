import { Component, OnInit } from '@angular/core';

import { QuestionService, ChatService, AlertService } from '../_services/index';
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

    allQuestion: Question[];

  data ;

  answerClicked: boolean = false;


  constructor(private _questionService: QuestionService,
              private _chatService: ChatService,
              private _alertService: AlertService) {

  }

  ngOnInit() {

    //this.question = this._questionService.getRandomQuestion();
    //console.log( this._questionService.getRandomQuestion())

  }


  btn1(){
    console.log("BTN1");
    //this.answerClicked = true;
    this._chatService.sendValasz(1);
    this._alertService.success("1. gomb kivalasztva!");
  }
  btn2(){
    console.log("BTN2");
    //this.answerClicked = true;
    this._chatService.sendValasz(2);
    this._alertService.success("2. gomb kivalasztva!");
  }
  btn3(){
    console.log("BTN3");
    //this.answerClicked = true;
    this._chatService.sendValasz(3);
    this._alertService.success("3. gomb kivalasztva!");
  }
  btn4(){
    console.log("BTN4");
    //this.answerClicked = true;
    this._chatService.sendValasz(4);
    this._alertService.success("4. gomb kivalasztva!");
  }

}
