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


  question: Question;

  list: Array<Question> = [];

  listsize;
  answer;
  matchResult;
  answerResult;

  allQuestion: Question[];

  connection;

  answerClicked: boolean = false;


  constructor(private _questionService: QuestionService,
              private _chatService: NewChatService,
              private _alertService: AlertService) {

  }

  ngOnInit() {
/*
    this._chatService
      .getMatchResult()
      .subscribe(matchResult =>{
        this.matchResult = matchResult;
        console.log("Kor eredmeny from nodejs:" + matchResult);
      });

    this._chatService
      .getQuestion()
      .subscribe(question => {
        this.question = JSON.parse(question) as Question;
        console.log("Question from nodejs: " + this.question);
      });



      this._chatService
        .getAnswerResult()
        .subscribe(result => {
          this.answerResult = result;
          console.log("answer result from nodejs: " + result);
        });
        */
        this._chatService
          .getRandomQuestion()
          .subscribe(getrandomquestions => {
            console.log("eljutott ide");
            this.list = JSON.parse(getrandomquestions) as Array<Question>;

            console.log("Questions from nodejs: " + this.list);
          });
        this.listsize = this.list.length;
        console.log('test');

  }


  btn1() {
    //this.answerClicked = true;
    this._alertService.success("1. gomb kivalasztva!");
    this._chatService.sendAnswer(1);
  }
  btn2() {
    //this.answerClicked = true;
    this._alertService.success("2. gomb kivalasztva!");
    this._chatService.sendAnswer(2);
  }
  btn3() {
    //this.answerClicked = true
    this._alertService.success("3. gomb kivalasztva!");
    this._chatService.sendAnswer(3);
  }
  btn4() {
    //this.answerClicked = true
    this._alertService.success("4. gomb kivalasztva!");
    this._chatService.sendAnswer(4);
  }
  btn5() {

    this._chatService.getsad();


    }


}
