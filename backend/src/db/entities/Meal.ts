import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Meal {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  uid: string;

  @Column({ length: 64})
  name: string;

  @Column()
  calories: number;

  @Column()
  createdAt: Date;

  @ManyToOne(type => User, user => user.meals, { onDelete: "CASCADE" })
  user: User;
}