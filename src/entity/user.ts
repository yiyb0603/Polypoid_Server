import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    nullable: false,
  })
  joined_at: Date;

  @Column({
    nullable: false,
    default: false,
  })
  is_admin: boolean;
}