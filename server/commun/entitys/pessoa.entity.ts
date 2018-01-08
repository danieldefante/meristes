import { PessoaFile } from './pessoaFile.entity';
import { Endereco } from './endereco.entity';
import { Contato } from './contato.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { MinLength, MaxLength, ValidateIf, IsNotEmpty } from 'class-validator';
import { isNullOrUndefined } from 'util';
import { Type } from 'class-transformer';



@Entity()
export class Pessoa {

    constructor() {

    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idPessoa: number;

    @OneToOne(type => PessoaFile, _pf => _pf.pessoa, { eager: true })
    @Type(() => PessoaFile)
    pessoaFile: PessoaFile;

    @IsNotEmpty()
    @Type(() => Contato)
    @OneToOne(type => Contato, { cascadeAll: true, eager: true })
    @JoinColumn()
    private contato: Contato;

    @IsNotEmpty()
    @Type(() => Endereco)
    @OneToOne(type => Endereco, { cascadeAll: true, eager: true })
    @JoinColumn()
    private endereco: Endereco;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Column({ type: 'varchar', length: 50 })
    private nome: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Column({ type: 'varchar', length: 50 })
    private sobrenome: string;

    @IsNotEmpty()
    @Column({ type: 'date' })
    private dataNascimento: Date;

    @ValidateIf(_p => !isNullOrUndefined(_p.rg) && _p.rg !== '')
    @MinLength(1)
    @MaxLength(14)
    @Column({ type: 'varchar', length: 14, nullable: true })
    private rg: string;

    @ValidateIf(_p => !isNullOrUndefined(_p.cpf) && _p.cpf !== '')
    @MinLength(1)
    @MaxLength(14)
    @Column({ type: 'varchar', length: 14, nullable: true })
    private cpf: string;

    @ValidateIf(_p => !isNullOrUndefined(_p.apelido) && _p.apelido !== '')
    @MinLength(1)
    @MaxLength(14)
    @Column({ type: 'varchar', length: 40, nullable: true })
    private apelido: string;


    @Column({ type: 'tinyint', default: true })
    private ativo: boolean;

    public getIdPessoa(): number {
        return this.idPessoa;
    }

    public setIdPessoa(idPessoa: number) {
        this.idPessoa = idPessoa;
    }

    public getContato(): Contato {
        return this.contato;
    }

    public setContato(contato: Contato) {
        this.contato = contato;
    }

    public getEndereco(): Endereco {
        return this.endereco;
    }

    public setEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string) {
        this.sobrenome = sobrenome;
    }

    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public setDataNascimento(datanascimento: Date) {
        this.dataNascimento = datanascimento;
    }

    public getRg(): string {
        return this.rg;
    }

    public setRg(rg: string) {
        this.rg = rg;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string) {
        this.cpf = cpf;
    }

    public getApelido(): string {
        return this.apelido;
    }

    public setApelido(apelido: string) {
        this.apelido = apelido;
    }

    public getAtivo(): boolean {
        return this.ativo;
    }

    public setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }

}