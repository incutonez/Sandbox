import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn} from 'typeorm';
import {Company} from './Company.js';

@Entity({name: 'Contacts'})
export class Contact {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Name!: string;

  @ManyToOne(() => Company)
  @JoinColumn({
    name: 'CompanyId'
  })
  Company!: Company;

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
}
