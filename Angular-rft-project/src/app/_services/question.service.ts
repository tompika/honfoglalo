import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Question } from '../_models/question';


@Injectable()
export class QuestionService {
  constructor(private http: Http) { }

  url: 'http://138.68.72.75:8090/SpringBootBasic/api/question/';

  question: Question;

  data: any = null;

  getQuestion() { }

  getQuest() {
    return this.http.get('http://138.68.72.75:8090/SpringBootBasic/api/question/')
      .map((res: Response) => res.json())
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
        return data;
      });
  }



  getSzar(): Promise<Question> {

    return this.http.get('http://localhost:8090/SpringBootBasic/api/question/')
      .toPromise()
      .then(response => response.json().data as Question)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /*
      this.question = new Question();
      this.http.get('http://138.68.72.75:8090/SpringBootBasic/api/question/')
          .map((res: Response) => res.json().data)
          .subscribe((json: Object) => {
              this.question = new Question().fromJSON(json);
          });
          console.log(this.question);
      return this.question;*/


  getById(_id: string) {
    return this.http.get('/bandsupport/api/user/' + _id).map((response: Response) => response.json());
  }

  create(user: Question) {
    return this.http.post('/users/register', user);
  }

  update(user: Question) {
    return this.http.put('/users/' + user.id, user);
  }

  delete(id: string) {
    return this.http.delete('/users/' + id);
  }
}
