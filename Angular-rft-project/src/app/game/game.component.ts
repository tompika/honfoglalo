import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService, AlertService } from '../_services/index';
import { NewChatService } from '../_services/newchat.service';
import { Question } from '../_models/question';
import { User } from '../_models/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  question: Question;
  currentUser: User;

  list: Array<Question> = [];

  stage: number = 0;

  listsize;
  answer;
  matchResult = {p1:'',p2:'',u1:'',u2:'',s1:'',s2:''};
  answerResult;

  allQuestion: Question[];



  connection;

  answerClicked: boolean = false;


  constructor(private _questionService: QuestionService,
              private _chatService: NewChatService,
              private router: Router,
              private _alertService: AlertService) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                console.log("Jelenlegi felhasznalo: "  + this.currentUser.username);


                console.log('const');
                this.question = new Question()
                this.question.answer1 = '';
                this.question.answer2 = '';
                this.question.answer3 = '';
                this.question.answer4 = '';
                this.question.question = '';
                this.question.canswer = '';





  }

  ngOnInit() {
    this.stage = 0;
    console.log('stage: '+this.stage);
    console.log('init');
    this._chatService
      .getPreGameRequest()
      .subscribe(preset =>{
        this.matchResult = preset;
        console.log("player 1 preset: " + preset.p1 + " result: " + preset.u1 + " score: " + preset.s1);
        console.log("player 2 preset: " + preset.p2 + " result: " + preset.u2 + " score: " + preset.s2);
      });
      this._chatService
        .getResult()
        .subscribe(Result =>{
          console.log('chatservice')
          this.matchResult = Result;
          this.getNextQuestion();
          console.log("player 1: " + Result.p1 + " result: " + Result.r1 + " score: " + Result.s1);
          console.log("player 2: " + Result.p2 + " result: " + Result.r2 + " score: " + Result.s2);
        });
    this._chatService
      .getRandomQuestion()
      .subscribe(getrandomquestions => {
        console.log("eljutott ide");
        this.list = getrandomquestions;
        if(this.list.length > 0){
          console.log('tru');
          this.question.answer1 = this.list[0].answer1;
          this.question.answer2 = this.list[0].answer2;
          this.question.answer3 = this.list[0].answer3;
          this.question.answer4 = this.list[0].answer4;
          this.question.question = this.list[0].question;
          this.question.canswer = this.list[0].canswer;
          console.log('1: ' + this.list[0].question);
          console.log('2: ' +this.question.question);
        }
        this.stage = 0;
      });
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




  }

  getNextQuestion(){
    console.log('getNextQuestion: '+this.stage);
    if(this.stage < 4){
      console.log('stage before: ' + this.stage);
      this.stage = this.stage + 1;
      console.log('stage after: ' + this.stage);
      console.log('1: ' + this.list[this.stage].question);
      this.question.answer1 = this.list[this.stage].answer1;
      this.question.answer2 = this.list[this.stage].answer2;
      this.question.answer3 = this.list[this.stage].answer3;
      this.question.answer4 = this.list[this.stage].answer4;
      this.question.question = this.list[this.stage].question;
    }else{
      console.log('else ág' + this.stage);
      this._chatService.endGame();
      this._chatService.getFriends(this.currentUser.username);
      this.router.navigate(['/home']);
      console.log('VÉGE!');
    }
  }
  btn1() {
    //this.answerClicked = true;
    console.log("1. gomb kivalasztva!");
    this._chatService.sendResult(this.stage,'1');

  }

  btn2() {
    //this.answerClicked = true;
    console.log("2. gomb kivalasztva!");
    this._chatService.sendResult(this.stage,'2');

  }
  btn3() {
    //this.answerClicked = true
    console.log("3. gomb kivalasztva!");
    this._chatService.sendResult(this.stage,'3');

  }

  btn4() {
    //this.answerClicked = true
    console.log("4. gomb kivalasztva!");
    this._chatService.sendResult(this.stage,'4');

  }



}
