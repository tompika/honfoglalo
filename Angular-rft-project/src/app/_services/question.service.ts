import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Question } from '../_models/question';


@Injectable()
export class QuestionService {
  constructor(private http: Http) { }

  url: 'http://localhost:8090/SpringBootBasic/api/question/';



  getRandomQuestion(){

    /*return this.http.get('http://localhost:8090/SpringBootBasic/api/question/')
       .map((res:Response) => res.json()).subscribe(data => this.question = data);
*/

  };

}
