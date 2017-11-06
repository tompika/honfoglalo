import { Component, OnInit } from '@angular/core';

import { QuestionService, ChatService } from '../_services/index';
import { Question } from '../_models/question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  question: Question = {
    id: 1,
    question: "Mi a szar ez?",
    answer1: "Ki tudja",
    answer2: "Passz",
    answer3: "Szar az egesz",
    answer4: "Passz",
    };

  data ;

  answerClicked: boolean = false;


  constructor(private _questionService: QuestionService,
              private _chatService: ChatService) {

  }

  ngOnInit() {
    this.data = this._questionService.getQuest();
    //this.question = Promise.apply(this._questionService.getSzar());

    console.log(this.question.answer1);

  }


  btn1(){
    console.log("BTN1");
    //this.answerClicked = true;
    this._chatService.sendValasz(1);
  }
  btn2(){
    console.log("BTN2");
    //this.answerClicked = true;
    this._chatService.sendValasz(2);
  }
  btn3(){
    console.log("BTN3");
    //this.answerClicked = true;
    this._chatService.sendValasz(3);
  }
  btn4(){
    console.log("BTN4");
    //this.answerClicked = true;
    this._chatService.sendValasz(4);
  }

}
