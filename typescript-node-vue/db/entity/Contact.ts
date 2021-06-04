import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

// TODO: https://pencilflip.medium.com/using-es-modules-with-commonjs-modules-in-node-js-1015786dab03
// Per https://github.com/typeorm/typeorm/issues/2797, we need the bang (!) for required fields
@Entity()
export default class Contact {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column()
  Company!: number;

  @Column()
  IsRecruiter!: boolean;

  @Column()
  Email!: string;

  @Column()
  CreateDate!: Date;
}