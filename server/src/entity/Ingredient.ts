import { BaseEntity, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { IngredientList } from "./IngredientList"

@Entity('ingredients')
export class Ingredient extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @PrimaryColumn()
    id: number

    @OneToMany(() => IngredientList, ingredientList => ingredientList.ingredient)
    ingredientList: IngredientList[]
}