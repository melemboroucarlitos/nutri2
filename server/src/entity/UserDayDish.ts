import { BaseEntity, Entity, ManyToOne } from "typeorm"
import { DayPlan } from "./DayPlan"
import { UserDish } from "./UserDish"

@Entity('user_day_dishes')
export class IngredientList extends BaseEntity {

    @ManyToOne(() => DayPlan, {primary: true})
    day_lan: DayPlan

    @ManyToOne(() => UserDish, {primary: true})
    user_dish: UserDish
}
