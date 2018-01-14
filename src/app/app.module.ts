import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';

import { UserGuard } from './user.guard';
import { LogOutComponent } from './log-out/log-out.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateaccountComponent },
  { path: 'home', component: HomepageComponent,canActivate:[UserGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    CreateaccountComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
          appRoutes,
        )
  ],
  providers: [CookieService,UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
