import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ObjectIdColumn,
  OneToOne,
} from "typeorm";
import { Profile } from "./profile";

@Entity("student")
export class Students extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column()
  email!: string;

  @OneToOne(() => Profile, (profile) => profile.student)
  @JoinColumn()
  profile?: Profile;
}
