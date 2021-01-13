import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category";
import { User } from "./User";

@Entity('post')
export class PostBoard {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_idx' })
  category: Category;

  @Column({
    nullable: false,
  })
  category_idx: number;

  @Column({
    nullable: false,
  })
  category_name: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  contents: string;

  @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writer_id' })
  user: User;

  @Column({
    nullable: false,
  })
  writer_id: string;

  @Column({
    nullable: false,
  })
  writer_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null,
  })
  updated_at: Date;
}