import { Entity, Column, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Generated } from "typeorm";
import { FStationEntity } from "./fstation";

@Entity({ name: "rteam" })
export class RTeamEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "bool", default: true })
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
}
