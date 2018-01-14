import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  onSubmit(userForm) {
    console.log(userForm);
    var user = {
      username: userForm.username,
      password: userForm.password
    };
    console.log(user);
    this.sendData(user);
  }

  constructor( private cookieService: CookieService,private http: HttpClient,private router: Router ) { }

  ngOnInit() {
  }

  sendData(user){
    var parameter = JSON.stringify(user);
    this.http.post("http://localhost:8000/create",parameter,{
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
