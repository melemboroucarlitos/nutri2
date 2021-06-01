import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Dish } from "./Dish"

@Entity('instructions')
export class Instruction extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @PrimaryColumn()
    step: number

    @Column()
    instruction: string

    @ManyToOne(() => Dish, {primary: true})
    dish: Dish
}
