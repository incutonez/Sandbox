import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from './Company.js';

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

  @ManyToOne(() => Company)
  @JoinColumn({
    name: 'CompanyId'
  })
  Company!: Company;
}