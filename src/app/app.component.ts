import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private cookieService: CookieService,private router: Router){}

  checkRouterUrl(){
  console.log(this.router.url=='home');
    if(this.router.url=='home'){
      return true;
    }else{
      return false;
    }
  }
}
