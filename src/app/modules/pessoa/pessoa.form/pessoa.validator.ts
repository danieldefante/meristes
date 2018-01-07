import { Pessoa } from '../../../class/pessoa';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

export class PessoaValidator {

    public validate(pessoa: Pessoa, formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            nome: new FormControl(pessoa.nome, [
                Validators.required,
                // Validators.minLength(4),
                // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
            ]),
            sobrenome: new FormControl(pessoa.sobrenome, [
                Validators.required]),
            apelido: new FormControl(pessoa.apelido),
            dataNascimento: new FormControl(pessoa.dataNascimento, [
                Validators.required]),
            dN: new FormControl(pessoa.dN),
            rg: new FormControl(pessoa.rg),
            cpf: new FormControl(pessoa.cpf),
            celular: new FormControl(pessoa.contato.celular, [
                Validators.required]),
            celularTwo: new FormControl(pessoa.contato.celularTwo),
            telefone: new FormControl(pessoa.contato.telefone),
            rua: new FormControl(pessoa.endereco.rua, [
                Validators.required]),
            numero: new FormControl(pessoa.endereco.numero, [
                Validators.required]),
            bairro: new FormControl(pessoa.endereco.bairro, [
                Validators.required]),
            email: new FormControl(pessoa.contato.email),
            urlRedeSocial: new FormControl(pessoa.contato.urlRedeSocial),
        });
    }

    constructor() {

    }

}