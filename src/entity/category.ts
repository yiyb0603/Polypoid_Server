import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    nullable: false,
  })
  user_id: string;
}