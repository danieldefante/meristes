import { MinLength, MaxLength, IsNotEmpty, ValidateIf } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from 'util';

@Entity()
export class Contato {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idContato: number;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(30)
    @Column({ type: 'varchar', length: 30 })
    private celular: string;

    @ValidateIf(_c => !isNullOrUndefined(_c.celularTwo) && _c.celularTwo !== '')
    @MinLength(8)
    @MaxLength(30)
    @Column({ type: 'varchar', length: 30, nullable: true })
    private celularTwo: string;

    @ValidateIf(_c => !isNullOrUndefined(_c.telefone) && _c.telefone !== '')
    @MinLength(1)
    @MaxLength(30)
    @Column({ type: 'varchar', length: 30, nullable: true })
    private telefone: string;

    @ValidateIf(_c => !isNullOrUndefined(_c.email) && _c.email !== '')
    @MinLength(5)
    @MaxLength(50)
    @Column({ type: 'varchar', length: 50, nullable: true })
    private email: string;

    @ValidateIf(_c => !isNullOrUndefined(_c.urlRedeSocial) && _c.urlRedeSocial !== '')
    @MinLength(1)
    @MaxLength(500)
    @Column({ type: 'varchar', length: 500, nullable: true })
    private urlRedeSocial: string;

    public getIdContato(): number {
        return this.idContato;
    }

    public setIdContato(idContato: number) {
        this.idContato = idContato;
    }

    public getCelular() {
        return this.celular;
    }

    public setCelular(celular) {
        this.celular = celular;
    }

    public getCelularTwo(): string {
        return this.celularTwo;
    }

    public setCelularTwo(celularTwo: string) {
        this.celularTwo = celularTwo;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string) {
        this.telefone = telefone;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getUrlRedeSocial(): string {
        return this.urlRedeSocial;
    }

    public setUrlRedeSocial(urlRedeSocial: string) {
        this.urlRedeSocial = urlRedeSocial;
    }

}
