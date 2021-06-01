import { QuantityType } from "../types/QuantityType"
import { BaseEntity, Column, Entity, ManyToOne } from "typeorm"
import { Dish } from "./Dish"
import { Ingredient } from "./Ingredient"

@Entity('ingredient_lists')
export class IngredientList extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @Column()
    quantity: number

    @Column()
    quantity_type: QuantityType

    @ManyToOne(() => Ingredient, {primary: true})
    ingredient: Ingredient

    @ManyToOne(() => Dish, {primary: true})
    dish: Dish
}
