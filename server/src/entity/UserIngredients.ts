import { BaseEntity, Column, Entity, ManyToOne } from "typeorm"

import { QuantityType } from "../types/QuantityType"
import { Ingredient } from "./Ingredient"
import { User } from "./User"

@Entity('user_ingredients')
export class UserIngredients extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @Column()
    quantity: number

    @Column()
    quantity_type: QuantityType

    @ManyToOne(() => User, {primary: true})
    user: User

    @ManyToOne(() => Ingredient, {primary: true})
    ingredient: Ingredient
}
