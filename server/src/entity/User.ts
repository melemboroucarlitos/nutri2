import { classToPlain, Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @IsEmail()
    @Column({unique:true})
    email: string

    @IsNotEmpty()
    @Length(7, 255)
    @Column({unique:true})
    username: string

    @IsNotEmpty()
    @Exclude()
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date


    toJSON(){
        return classToPlain(this);
    }
}

//TODO: Look into creating indexes
//TODO: Create custom password validator
//TODO: Decide on whether you want to implement the before insert in this data model or on the resolver
//TODO: Camel casing or underscore field properties