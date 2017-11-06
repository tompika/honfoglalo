import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {

      let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
      let options = new RequestOptions( {headers: headers });


        return this.http.post('http://localhost:8090/SpringBootBasic/api/authenticate', JSON.stringify({ username : username, password: password }), options)
            .map((response: Response) => {

                console.log(response);
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'));
                }

                return user;
            });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
