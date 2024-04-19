import { BaseEntity } from "../commons/base.entity";
import { Entity,Column } from "typeorm";
@Entity({name:"request"})
export class RequestEntity extends BaseEntity<RequestEntity>{
    @Column({type: "float"})
    longitude!: number
    @Column({type: "float"})
    latitude!: number
    @Column({type: "bool"})
    approved!: boolean
    @Column({type: "bool"})
    put_out!: boolean
}

