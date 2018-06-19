import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class AccessToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64})
  token: string;

  @Column()
  createdAt: Date;

  @Column()
  validUntil: Date;

  @OneToOne(type => User, user => user.accessToken, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}