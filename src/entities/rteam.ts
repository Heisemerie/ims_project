import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
} from "typeorm";
import { FStationEntity } from "./fstation";
import { RequestEntity } from "./request";

@Entity({ name: "rteam" })
export class RTeamEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "bool", default: false })
  status!: boolean;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: false,
  })
  created_at!: Date;

  @ManyToOne(() => FStationEntity, (station) => station.rteams, {
    onDelete: "CASCADE",
    cascade: ["remove"],
  })
  @JoinColumn({ name: "firestat_id" })
  station!: FStationEntity;

  @OneToMany(() => RequestEntity, (request) => request.rteam)
  requests!: RequestEntity[];
}
