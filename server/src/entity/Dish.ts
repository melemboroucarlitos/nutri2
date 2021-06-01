import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { IngredientList } from "./IngredientList"
import { Instruction } from "./Instruction"

@Entity('dishes')
export class Dish extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Instruction, instruction => instruction.dish)
    instructions: Instruction[]

    @OneToMany(() => IngredientList, ingredientList => ingredientList.dish)
    ingredientList: IngredientList[]
}