import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { AccessToken } from "./AccessToken";
import { Meal } from "./Meal";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 16})
  role: string;

  @Column({ length: 64})
  password: string;

  @Column({ length: 64, unique: true })
  uid: string;

  @Column({ nullable: true })
  dailyCalorieGoal: number;

  @Column()
  createdAt: Date;

  @OneToOne(type => AccessToken, accessToken => accessToken.user, {
    cascade: true
  })
  accessToken: AccessToken;

  @OneToMany(type => Meal, meal => meal.user)
  meals: Meal[];
}