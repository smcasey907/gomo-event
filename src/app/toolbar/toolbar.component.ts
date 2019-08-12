import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { XApiService } from './../service/x-api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  loggedIn: boolean;

  constructor(
    private appComp: AppComponent,
    private xas: XApiService
  ) { }

  ngOnInit() {
    this.loggedIn = false;
    this.appComp.isAuth.subscribe(val => {
      if (val === true) {
        this.loggedIn = true;
      }
    });
  }

  logout() {
    this.xas.resetOptionsUrl();
    this.appComp.isAuth.next(false);
    this.appComp.events = [];
    this.appComp.username = undefined;
    this.appComp.password = undefined;
    this.appComp.authHash = undefined;
    this.loggedIn = false;
  }

}
