import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  firstName: string;

  @Column({
    length: 255,
  })
  lastName: string;

  @Column({
    length: 255,
  })
  patronymic: string;

  @Column({
    length: 255,
  })
  login: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAdmin: boolean;
}
