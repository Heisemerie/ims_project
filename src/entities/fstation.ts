import { BaseEntity } from "../commons/base.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { DriverEntity } from "./driver";

@Entity({ name: "fstations" })
export class FStationEntity extends BaseEntity<FStationEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  hotline!: string;

  @OneToMany(() => DriverEntity, (drivers) => drivers.station)
  drivers!: DriverEntity[];
}
