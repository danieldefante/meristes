//angular
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

//libs
import { Observable } from 'rxjs';

//this
import { PessoaResource } from './../../resouces/pessoa.resource';
import { Pessoa } from './../../class/pessoa';


@Injectable()
export class PessoaRouteResolver implements Resolve<Pessoa> {

    constructor(private pessoaResource: PessoaResource ){}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<Pessoa>{ 
            
        let idPessoa = route.params['idPessoa'];
        return this.pessoaResource.get({idPessoa: idPessoa}).$observable;
    }

}