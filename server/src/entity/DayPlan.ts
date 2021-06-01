import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User"

enum weekday {
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednsday',
    'Thursday',
    'Friday',
    'Saturday'
}

@Entity('day_plans')
export class DayPlan extends BaseEntity{ //lets figure out the compostion rather than inheritance imp
    @PrimaryColumn()
    weekday: weekday

    @PrimaryColumn()
    meal_index: number

    @ManyToOne(() => User, {primary: true})
    user: User
}

//TODO: Think on how adding a visibility option would change this schema up