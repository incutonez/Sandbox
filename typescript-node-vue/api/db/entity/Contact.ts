import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn} from 'typeorm';
import {Application} from './Application.js';
import {Company} from './Company.js';

@Entity({name: 'Contacts'})
export class Contact {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column()
  IsRecruiter!: boolean;

  @Column({
    type: 'text',
    nullable: true
  })
  Email!: string;

  /**
   * By default, we never include the CreateDate when selecting the Contact.
   * However, we can turn this on by doing a custom createQueryBuilder and using the addSelect method
   * See also: https://stackoverflow.com/a/55169910/1253609
   */
  @CreateDateColumn({
    select: false
  })
  CreateDate!: Date;

  @ManyToOne('Company', 'Contacts')
  @JoinColumn({
    name: 'CompanyId'
  })
  Company!: Company;

  @ManyToOne('Application', 'Contacts')
  @JoinColumn({
    name: 'ApplicationId'
  })
  Application!: Application;
}
