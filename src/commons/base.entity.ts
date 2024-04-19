import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    Generated,
  } from "typeorm";
  
  export class BaseEntity<T = any> {
    // This is what we use internally as a foreign key, but never expose to the public because leaking user counts is
    // a company trade secrets issue
    // (Running counter keys make data more local and faster to access)
    @PrimaryGeneratedColumn()
    id!: number;
  
    // Already refer users by this id when in the APIs .
    // (Randomized public ids make data exposure safer)
    @Column({ unique: true })
    @Generated("uuid")
    public_id!: string;
  
    // Nice columns for internal statistics and diagnostics
    // We assume all servers tick UTC, but we always preserve timezone for
    // our sanity when something gets messy
    @CreateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
      nullable: false,
      comment: "Entity Created At",
    })
    created_at!: Date;
  
    // Nice columns for internal statistics and diagnostics
    @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
      nullable: false,
      comment: "Entity Updated At",
    })
    updated_at!: Date;
  
    // Nice columns for internal statistics and diagnostics
    @DeleteDateColumn({
      type: "timestamp",
      nullable: true,
      comment: "Entity Deleted At",
    })
    deleted_at!: Date;
  
    constructor(partial: Partial<T>) {
      Object.assign(this, partial);
    }
  }