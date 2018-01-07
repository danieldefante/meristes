import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loaderService';

///test
import { DataService } from './data.service'
////test

export const REST_API = 'http://localhost:3000/api/v1/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public showLoader: boolean;

  //test
  users: Array<any>;
  //test

  constructor(
    private loaderService: LoaderService,
    ///test
    private _dataService: DataService
    ///test
  ) {
    ///test
    this._dataService.getUsers()
      .subscribe(res => {
        this.users = res
      });
    ///test

  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
