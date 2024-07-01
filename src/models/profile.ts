import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ObjectIdColumn,
  OneToOne,
} from "typeorm";
import { Students } from "./students";

@Entity("profile")
export class Profile extends BaseEntity {
  @ObjectIdColumn()
  id?: number;

  @Column()
  dob!: string;

  @Column()
  bio!: string;

  @OneToOne(() => Students, (student) => student.profile)
  @JoinColumn()
  student?: Students;
}
