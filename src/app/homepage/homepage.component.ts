import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule,FormGroup,FormControl }   from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

   diaryForm = new FormGroup({diaryText: new FormControl(), language: new FormControl()});

   constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
  }

  translate(){
   console.log(this.diaryForm.value);
      this.sendDataToTranslate(this.diaryForm.value);
  }

  onSubmit(){
      this.sendDataInDB(this.diaryForm.value);
  }

  sendDataInDB(diary){
      var headers = new HttpHeaders().set('Content-type','application/json');
       console.log(diary);
         var parameter = JSON.stringify({
            username: this.cookieService.get('sessionId'),
            diaryText : diary['diaryText']
         });

         this.http.post("http://localhost:8000/diary",parameter,{headers: headers})
         .subscribe(
                 res => {
                 console.log(res);
                 },
                 err => {
                   console.log(err);
                 }
               );
  }

   sendDataToTranslate(diary){
       var headers = new HttpHeaders().set('Content-type','application/json');
       var parameter = JSON.stringify(diary);
       console.log(parameter);

       this.http.post("http://localhost:8000/translate",parameter,{headers: headers})
       .subscribe(
               res => {
               this.diaryForm.setValue({
                  diaryText:res['translated'],
                  language: 'en'
               })
               },
               err => {
                 console.log(err);
               }
             );
     }

     refresh(diaryForm,newValues){

     }

     getDiaryFromDb(username){
         this.http.get("http://localhost:8000/diary?username="+this.cookieService.get('sessionId')).subscribe(
              res => {
                       console.log(res);
                        this.diaryForm.setValue({
                                         diaryText: res['response'][res['response'].length-1]['message'],
                                         language: 'en'
                                      })
                      },
              err => {
                        console.log(err);
                     }
              );
        }

}
