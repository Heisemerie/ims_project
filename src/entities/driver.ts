import { BaseEntity } from "../commons/base.entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { FStationEntity } from "./fstation";

@Entity({ name: "drivers" })
export class DriverEntity extends BaseEntity<DriverEntity> {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "bool", default: true })
  status!: boolean;

  @ManyToOne(() => FStationEntity, (station) => station.drivers, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "station_id" })
  station!: FStationEntity;
}
