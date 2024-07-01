import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column()
  custName!: string;

  @Column()
  custAge!: number;

  @Column()
  custEmail!: string;
}
