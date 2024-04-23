import { Entity, Column, OneToMany, Generated, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { RTeamEntity } from "./rteam";
import { RequestEntity } from "./request";

@Entity({ name: "fstations" })
export class FStationEntity {
  // entity attributes
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  hotline!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: false,
  })
  created_at!: Date;

  @OneToMany(() => RTeamEntity, (rteams) => rteams.station)
  rteams!: RTeamEntity[];

  @OneToMany(() => RequestEntity, (request) => request.station)
  requests!: RequestEntity[];
}
