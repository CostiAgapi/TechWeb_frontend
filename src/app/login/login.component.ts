import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  onSubmit(userForm) {
      console.log(userForm);
      var user = {
        username: userForm.username,
        password: userForm.password
      };
      console.log(user);
      this.sendData(user);
    }

  constructor( private cookieService: CookieService,private http: HttpClient,private router : Router) { }

  ngOnInit() {
  }

  sendData(user){
      var parameter = JSON.stringify(user);
      this.http.post("http://localhost:8000/login",parameter,{
        headers: new HttpHeaders().set('Content-type', 'application/json'),
       })
      .subscribe(
              res => {
                this.cookieService.set( 'sessionId', user.username, 1 );
                this.router.navigate(['/home']);
              },
              err => {
                console.log(err);
              }
            );
    }

}
