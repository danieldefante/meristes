//angular
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

//libs
import { NotificationsService } from 'angular2-notifications';

//this
import { Ministerio } from './../../../class/Ministerio';
import { CommunComponent } from '../../../arquitetura/commun/communComponent';
import { MinisterioResource } from './../../../resouces/ministerio.resource';
import { Paged } from './../../../arquitetura/commun/paged';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-ministerio-list',
  templateUrl: './ministerio.list.component.html',
  styleUrls: ['./ministerio.list.component.css']
})
export class MinisterioListComponent extends CommunComponent implements OnInit {

  public ministerios: any[];
  public paged: Paged = new Paged();

  constructor(public dialog: MatDialog,
    private ministerioResource: MinisterioResource,
    private notificationsService: NotificationsService,
    private router: Router,
  ) {
    super(notificationsService)
  }

  ngOnInit(): void {
    this.fill();
  }

  private fill() {
    this.spinner(true);
    let retorno = this.ministerioResource.getPaged(this.paged);

    retorno.$observable.subscribe(
      (respost) => {
        this.ministerios = respost.dataList;
        this.paged.sizeDB = respost.sizeDB
        this.spinner(false);
      },
      (error) => {
        this.alertShow(error);
        this.spinner(false);
      }
    );
  }

  public edit(ministerio) {
    this.router.navigate(['ministerio', ministerio.idMinisterio]);
  }

  public openDialog(ministerioSelected: Ministerio) {
    let dialogRef = this.dialog.open(MinisterioDialogComponent,
      {
        data: {
          idMinisterio: ministerioSelected.idMinisterio,
        },
        width: '650px',
        height: '420px',
      }
    );
    let instance = dialogRef.componentInstance;

  }

  public closeModal() {
    this.dialog.closeAll();
  }

  public onPaginateChange(event) {
    this.paged.size = event.pageSize;
    this.paged.page = event.pageIndex
    this.fill();
  }

}

@Component({
  selector: 'app-ministerio-dialog',
  templateUrl: './ministerio.dialog.html',
  styleUrls: ['./../../../app.component.css', './ministerio.list.component.css']

})
export class MinisterioDialogComponent extends CommunComponent {
  public ministerio: Ministerio = new Ministerio();
  constructor(public dialogRef: MatDialogRef<MinisterioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ministerioResource: MinisterioResource,
    private notificationsService: NotificationsService,
    ) {
    super(notificationsService)
  }

  ngOnInit(): void {
    this.fill();
  }

  private fill() {
    this.spinner(true);
    let retorno = this.ministerioResource.get({ idMinisterio: this.data.idMinisterio });
    retorno.$observable.subscribe(
      (respost) => {
        this.ministerio = respost;
        this.spinner(false);
      },
      (error) => {
        this.alertShow(error);
        this.spinner(false);
      }
    );
  }

  public closeModal() {
    this.dialogRef.close({

    });
  }
}