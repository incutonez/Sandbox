import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Contact} from './Contact.js';
import {Application} from './Application.js';

@Entity({name: 'Companies'})
export class Company {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column()
  IsRecruitment!: boolean;

  @CreateDateColumn({
    select: false
  })
  CreateDate!: Date;

  @OneToMany(() => Contact, (contact) => contact.Company)
  Contacts!: Contact[];

  @OneToMany(() => Application, (application) => application.Company)
  Applications!: Application[];
}