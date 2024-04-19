import { BaseEntity } from "../commons/base.entity";
import { Entity, Column } from "typeorm";
@Entity({ name: "requests" })
export class RequestEntity extends BaseEntity<RequestEntity> {
  @Column({ type: "float" })
  longitude!: number;

  @Column({ type: "float" })
  latitude!: number;

  @Column({ type: "bool", default: false })
  approved!: boolean;

  @Column({ type: "bool", default: false })
  put_out!: boolean;
}
