import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  name: string;
}