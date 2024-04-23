import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { FStationEntity } from "./fstation";

@Entity({ name: "requests" })
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "float" })
  longitude!: number;

  @Column({ type: "float" })
  latitude!: number;

  @Column({ type: "bool", default: false })
  approved!: boolean;

  @Column({ type: "bool", default: false })
  put_out!: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: false,
  })
  created_at!: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  time_arrived!: Date;

  @ManyToOne(() => FStationEntity, (station) => station.requests, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "station_id" })
  station!: FStationEntity;
}
