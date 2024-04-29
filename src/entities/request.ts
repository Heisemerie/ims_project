import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FStationEntity } from "./fstation";
import { RTeamEntity } from "./rteam";

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
  time_arrived!: Date | null;

  // relationships
  @ManyToOne(() => FStationEntity, (station) => station.requests, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "station_id" })
  station!: FStationEntity;

  @ManyToOne(() => RTeamEntity, (rteam) => rteam.requests, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "rteam_id" })
  rteam!: RTeamEntity | null;
}
