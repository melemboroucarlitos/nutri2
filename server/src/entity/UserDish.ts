import { BaseEntity, Entity, ManyToOne } from "typeorm"
import { Dish } from "./Dish"
import { User } from "./User"

@Entity('user_dishes')
export class UserDish extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @ManyToOne(() => User, {primary: true})
    user: User

    @ManyToOne(() => Dish, {primary: true})
    dish: Dish
}
