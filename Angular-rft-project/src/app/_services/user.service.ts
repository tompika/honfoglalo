import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { appConfig } from '../app.config';

import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    private url = "";

    getAll() {
        return '';
        //return this.http.get('http://localhost:8080/api/user/').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/api/user/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {

        let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
        let options = new RequestOptions( {headers: headers });

        //console.log(JSON.stringify(user));
        return this.http.post('http://localhost:8090/SpringBootBasic/registration', user, options);
    }

    update(user: User) {
        return this.http.put('/users/' + user.id, user);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }
}
