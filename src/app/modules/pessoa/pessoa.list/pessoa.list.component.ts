import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pessoa } from './../../../class/pessoa';
import { PessoaResource } from './../../../resouces/pessoa.resource';
import { LoaderService } from './../../../services/loaderService';
import { Paged } from './../../../arquitetura/commun/paged';
import { CommunComponent } from './../../../arquitetura/commun/communComponent';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa.list.component.html',
  styleUrls: ['./pessoa.list.component.css']
})
export class PessoaListComponent extends CommunComponent implements OnInit {
  
    private pessoas: any[];
    private paged: Paged = new Paged();
  
    constructor(public dialog: MatDialog,
      private pessoaResource: PessoaResource,
      private notificationsService: NotificationsService,
      // private loaderService: LoaderService,
      private router: Router,
    ) {
      super(notificationsService)
    }
  
    ngOnInit(): void {
      this.fill();
    }
  
    private fill() {
      this.spinner(true);
      let retorno = this.pessoaResource.getPaged(this.paged);
  
      retorno.$observable.subscribe(
        (respost) => {
          this.pessoas = respost.dataList;
          this.paged.sizeDB = respost.sizeDB
          this.spinner(false);
        },
        (error) => {
          this.alertShow(error);
          this.spinner(false);
        }
      );
    }

    private edit(pessoa) {
      this.router.navigate(['pessoa', pessoa.idPessoa]);
    }
  
    private openDialog(pessoaSelected: Pessoa) {
      let dialogRef = this.dialog.open(PessoaDialogComponent,
        {
          data: {
            idPessoa: pessoaSelected.idPessoa,
          },
          width: '650px',
          height: '420px',
        }
      );
      let instance = dialogRef.componentInstance;
  
    }
  
    private closeModal() {
      this.dialog.closeAll();
    }
  
    private onPaginateChange(event) {
      this.paged.size = event.pageSize;
      this.paged.page = event.pageIndex
      this.fill();
    }
  
  }
  
  @Component({
    selector: 'app-pessoa-dialog',
    templateUrl: './pessoa.dialog.html',
    styleUrls: ['./../../../app.component.css', './pessoa.list.component.css']
  
  })
  export class PessoaDialogComponent extends CommunComponent {
    private pessoa: Pessoa = new Pessoa();
    constructor(public dialogRef: MatDialogRef<PessoaDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private pessoaResource: PessoaResource,
      private notificationsService: NotificationsService,
      // private loaderService: LoaderService
      ) {
      super(notificationsService)
    }
  
    ngOnInit(): void {
      this.fill();
    }
  
    private fill() {
      this.spinner(true);
      let retorno = this.pessoaResource.get({ idPessoa: this.data.idPessoa });
      retorno.$observable.subscribe(
        (respost) => {
          this.pessoa = respost;
          this.spinner(false);
        },
        (error) => {
          this.alertShow(error);
          this.spinner(false);
        }
      );
    }
  
    private closeModal() {
      this.dialogRef.close({
  
      });
    }
  }