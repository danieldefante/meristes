import { MinLength, MaxLength, IsNotEmpty, ValidateIf } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from 'util';

@Entity()
export class Endereco {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idEndereco: number;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Column({ type: 'varchar', length: 50 })
    private rua: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @Column({ type: 'varchar', length: 20 })
    private numero: string;

    @ValidateIf(_e => !isNullOrUndefined(_e.cep) && _e.cep !== '')
    @MinLength(1)
    @MaxLength(10)
    @Column({ type: 'varchar', length: 10, nullable: true })
    private cep: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Column({ type: 'varchar', length: 50 })
    private bairro: string;

    @ValidateIf(_e => !isNullOrUndefined(_e.complemento) && _e.complemento !== '')
    @MinLength(1)
    @MaxLength(30)
    @Column({ type: 'varchar', length: 30, nullable: true })
    private complemento: string;

    public getIdEndereco(): number {
        return this.idEndereco;
    }

    public setIdEndereco(idEndereco: number) {
        this.idEndereco = idEndereco;
    }

    public getRua(): string {
        return this.rua;
    }

    public setRua(rua: string) {
        this.rua = rua;
    }

    public getNumero(): string {
        return this.numero;
    }

    public setNumero(numero: string) {
        this.numero = numero;
    }

    public getCep(): string {
        return this.cep;
    }

    public setCep(cep: string) {
        this.cep = cep;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public setBairro(bairro: string) {
        this.bairro = bairro;
    }

    public getComplemento(): string {
        return this.complemento;
    }

    public setComplemento(complemento: string) {
        this.complemento = complemento;
    }
}
