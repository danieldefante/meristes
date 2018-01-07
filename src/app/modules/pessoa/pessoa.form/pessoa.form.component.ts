/////angular
import { Component, OnInit, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

/////libs
import { NotificationsService } from 'angular2-notifications';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

/////this
import { LoaderService } from './../../../services/loaderService';
import { CommunComponent } from '../../../arquitetura/commun/communComponent';
import { PessoaValidator } from './pessoa.validator';
import { Masks } from './../../../arquitetura/commun/masks';
import { Pessoa } from '../../../class/pessoa';
import { PessoaFileResource } from '../../../resouces/pessoaFile.resource';
import { PessoaResource } from '../../../resouces/pessoa.resource';
import { ValidatorFields } from './../../../arquitetura/commun/validatorFields';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pessoa.form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.css']
})
export class PessoaFormComponent extends CommunComponent implements OnInit {

  private pessoa: Pessoa = new Pessoa();
  private validatorFields: ValidatorFields = new ValidatorFields();
  private pessoaValidator: PessoaValidator = new PessoaValidator();
  private formValidations: FormGroup = this.pessoaValidator.validate(this.pessoa, this.formBuilder);
  private masks: Masks = new Masks;

  constructor(private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    public dialog: MatDialog,
    private pessoaResource: PessoaResource,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(notificationsService);
  }

  ngOnInit() {
    this.resolveRoute();
  }

  private save() {
    if (this.formValidations.valid) {
      this.spinner(true);

      let method = this.pessoa.idPessoa ? 'update' : 'save';

      let model = this.prepareSavePessoa();

      let retorno = this.pessoaResource[method](model, { idPessoa: this.pessoa.idPessoa });

      retorno.$observable.subscribe(
        (respost) => {
          this.spinner(false);
          this.formValidations.markAsPristine({ onlySelf: true });

          this.fill(respost);
        },
        (error) => {
          this.alertShow(error);
        });
    }
  }

  private getObjId(nameId: string, route: any, respost?: any, model?: any): any {
    let idRetorno: number;

    route.params.subscribe(params => {
      idRetorno = +params[nameId];
    }).unsubscribe();

    if (idRetorno) {
      return { [nameId]: idRetorno };
    } else if (respost) {
      return { [nameId]: respost.data[nameId] };
    } else if (model) {
      return { [nameId]: model[nameId] };
    }

    return { [nameId]: undefined };
  }

  private prepareSavePessoa() {
    let model = Object.assign({}, this.pessoa);
    delete model.pessoaFile;

    return model;
  }

  private isValidateForm(): boolean {
    return this.formValidations.pristine || this.formValidations.invalid;
  }

  private back() {
    this.router.navigate(['pessoa']);
  }

  private openImage() {

    let dialogRef = this.dialog.open(DialogImagePessoa, {
      data: {
        idPessoaFile: this.pessoa.pessoaFile.idPessoaFile,
        idPessoa: this.pessoa.idPessoa
      },
      width: '700px',
      height: '500px'
    });
    let instance = dialogRef.componentInstance;

    let retorno = dialogRef.afterClosed();

    retorno.subscribe(result => {
      if (result) {
        this.fill(result);
      }
    });
  }

  ///////////////////

  private resolveRoute() {
    this.route.data.subscribe(
      (data) => {
        if (data.pessoa) {
          this.pessoa = data.pessoa;
        }
      }
    ).unsubscribe();
  }

  private fill(respost) {
    this.spinner(true);

    if (respost.data) {
      this.router.navigate(['/pessoa/', respost.data.idPessoa]).then(() => {
        setTimeout(() => {
          this.meristesAlert.show(respost);
        }, 10);
      });
    } else {
      this.pessoaResource.get({ idPessoa: this.pessoa.idPessoa })
        .$observable
        .subscribe(
        (data) => {
          if (respost) {
            this.pessoa = data;
            setTimeout(() => {
              this.alertShow(respost);
            }, 10);
          }

          this.spinner(false);
        }
        );
    }
  }
}

@Component({
  selector: 'app-image-pessoa-dialog',
  templateUrl: './imagePessoa.dialog.html',
  styleUrls: ['./pessoa.form.component.css']
})
export class DialogImagePessoa extends CommunComponent {

  data: any = {};
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public dialogRef: MatDialogRef<DialogImagePessoa>,
    @Inject(MAT_DIALOG_DATA) public dataInit: any,
    private pessoaFileResource: PessoaFileResource,
    notificationsService: NotificationsService
  ) {
    super(notificationsService);
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 655;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;
    this.cropperSettings.rounded = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.preserveSize = true;

  }

  ngOnInit() {
  }

  private closeDialog(value) {
    this.dialogRef.close(value);
  }

  private fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  private saveImage() {
    let method = this.dataInit.idPessoaFile ? 'update' : 'save';
    let params = {
      idPessoa: this.dataInit.idPessoa,
      idPessoaFile: this.dataInit.idPessoaFile
    };
    let retorno = this.pessoaFileResource[method](this.data.image, params);

    retorno.promise.then(
      (respost) => {
        this.closeDialog(respost);
      });
  }
}
