import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from './Company.js';
import {Contact} from './Contact.js';

@Entity({name: 'Applications'})
export class Application {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Position!: string;

  @Column()
  PositionType!: number;

  @Column()
  Link!: string;

  @CreateDateColumn({
    select: false
  })
  CreateDate!: Date;

  @ManyToOne('Company', 'Applications')
  @JoinColumn({
    name: 'CompanyId'
  })
  Company!: Company;

  @OneToMany('Contact', 'Application')
  Contacts!: Contact[];
}