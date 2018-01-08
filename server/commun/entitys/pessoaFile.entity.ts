import { JoinColumn, OneToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class PessoaFile {

    constructor() {

    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idPessoaFile: number;

    @IsNotEmpty()
    @OneToOne(type => Pessoa, { eager: false })
    @JoinColumn()
    pessoa: Pessoa;

    @Column({ type: 'varchar', length: 50 })
    private mimetype: string;

    @Column({ type: 'int' })
    private size: number;

    @Column({ type: 'longblob' })
    private buffer: any;

    public getIdPessoaFile(): number {
        return this.idPessoaFile;
    }

    public setIdPessoaFile(idPessoaFile: number) {
        this.idPessoaFile = idPessoaFile;
    }

    public getPessoa(): Pessoa {
        return this.pessoa;
    }

    public setPessoa(pessoa: Pessoa) {
        this.pessoa = pessoa;
    }

    public getMimetype(): string {
        return this.mimetype;
    }

    public setMimetype(mimetype: string) {
        this.mimetype = mimetype;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number) {
        this.size = size;
    }

    public getBuffer(): any {
        return this.buffer;
    }

    public setBuffer(buffer: any) {
        this.buffer = buffer;
    }

}