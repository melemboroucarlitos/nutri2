import { NextFunction, Request, Response, Router } from "express"
import { Dish } from "../entity/Dish"
import { UserDish } from "../entity/UserDish"
import { Ingredient } from "../entity/Ingredient"
import { UserIngredients } from "../entity/UserIngredients"
import myauth from "../middleware/myauth"


const getIngredients = async (__: Request, res: Response, _: NextFunction) => {

    try {
        //this has gotta catch SQL Injections
        const results = await UserIngredients.query(`SELECT "ingredientId", quantity, quantity_type
                                                     FROM user_ingredients
                                                     WHERE "userId" = '${res.locals.user.id}';`)  
        console.log(results)
        return res.status(200).send(results)
    } catch (error) {
      
      console.log(error)
      return res.status(401).json({error: error.message}) //On deployment, change this... also review the status codes
    }
}

const addIngredient = async (req: Request, res: Response, _: NextFunction) => {
    console.log("here's the user:", res.locals.user)
    console.log("here's the request~:", req.body)

    try {
        const {foodId, quantity} = req.body

        //check to see if the ingredient is in the database
        const ingredient = await Ingredient.findOne({id: foodId})
        console.log('The Ingredient was not found: ', (!ingredient))

        //check to see if the ingredient is already linked to user
        const linked = await UserIngredients.findOne({user: res.locals.user, ingredient: ingredient})
        console.log('The Ingredient was not linked: ', (!linked)
        )
        //perform your writes accordingly
        if(!ingredient && !linked) {
            //Translate this to the ORM... save yourself from SQL Injections
            const result = await UserIngredients.query(`BEGIN;
                                         
                                                        INSERT INTO ingredients
                                                        (id)
                                                        VALUES
                                                        (${foodId});
                                                        
                                                        INSERT INTO user_ingredients
                                                        (quantity, quantity_type, "userId", "ingredientId")
                                                        VALUES
                                                        (${quantity.quantity}, '${quantity.quantityType}', '${res.locals.user.id}', ${foodId});
                                                        
                                                        COMMIT;`)

            console.log("Created: here's the result:", result)
        } else if(ingredient && !linked){
            //Translate this to the ORM... save yourself from SQL Injections... also still gotta test this one
            const result = await UserIngredients.query(`BEGIN;

                                                        INSERT INTO user_ingredients
                                                        (quantity, quantity_type, "userId", "ingredientId")
                                                        VALUES
                                                        (${quantity.quantity}, '${quantity.quantityType}', '${res.locals.user.id}', ${foodId});
                                                        
                                                        COMMIT;`)

            console.log("Linked: here's the result:", result)
        }else if(ingredient && linked) {
            //Translate this to the ORM... save yourself from SQL Injections
            const result = await UserIngredients.query(`BEGIN;

                                                        UPDATE user_ingredients
                                                        SET quantity=${quantity.quantity}, quantity_type='${quantity.quantityType}'
                                                        WHERE "userId"='${res.locals.user.id}' AND "ingredientId"=${foodId};
                                                        
                                                        COMMIT;`)

            console.log("Updated: here's the result:", result)
        }
    } catch (error) {
        console.log(error)//Send back appropriate error
    }
}

const getDish = async (__: Request, res: Response, _: NextFunction) => {
    try {
        //Data type for outgoing request
        type ingredientData = {
            id: number,
            name: string,
            quantity: number,
            quantity_type: string,
            ingredientId: number
        }

        type instructionData  = {
            id: number,
            step: number,
            instruction: string
        }

        const userId: string = res.locals.user.id

        const entries: ingredientData[] = await UserDish.query(`SELECT id, name, quantity, quantity_type, "ingredientId"     
                                              FROM user_dishes
                                              JOIN dishes
                                              ON "dishId"=id
                                              JOIN ingredient_lists
                                              ON ingredient_lists."dishId"=id
                                              WHERE "userId"='${userId}'`)

        console.log("here's all the entries", entries)

        const dishes: number[] = (() => {
            let value: number[] = [];

            entries.forEach((_, index) => {
                if(!value.includes(entries[index].id)) value.push(entries[index].id)
            })

            return value
        })();

        console.log("here's all the dishes", dishes)

        //refactor using flatmap
        const instructions: instructionData[] = await Promise.all(dishes.map(async dish => await UserDish.query(`SELECT step, instruction, "dishId" AS id
                                                       FROM instructions
                                                       WHERE "dishId"=${dish};`)))

        console.log("here's all the instructions", instructions)

        // type ingredient = {
        //     id: number,
        //     quantity: number,
        //     quantity_type: 'g' | 'oz'
        // }

        // type instruction = {
        //     step: number,
        //     instruction: string
        // }

        //organize
        // type sendit = {
        //     name: string,
        //     ingredients: ingredient[],
        //     instructions: instruction[]
        // }

        //refactor to send this res.status
        res.status(200).json({ingredients: entries, instructions: instructions})
    } catch (error) {
        console.log(error)//Send back appropriate error
    }
}

const addDish = async (req: Request, res: Response, _: NextFunction) => {
    try {
        //put some dynamic type checking into this messness
        console.log("here's the user:", res.locals.user)
        console.log("here's the request:", req.body)

        type ingredient = {
            id: number, 
            quantity: {
                quantity: number,
                type: string
            }
        }

        type postDish = {
            name: string,
            instructions: string[],
            ingredients: ingredient[]
        }

        const post: postDish = req.body
        const userId: string = res.locals.user.id

        //check to see if the user has a dish by that name... send back error if that's the case (UserDish)
        const present: Array <any> = await UserDish.query(`SELECT *
                                              FROM user_dishes
                                              JOIN dishes
                                              ON "dishId"=dishes.id
                                              JOIN "users"
                                              ON "userId"=users.id
                                              WHERE name='${post.name}' AND "userId"='${userId}';`)

        if(present.length !== 0) throw new Error('This user already has a dish by that name')//send back the duplicate dish and ask if you want to rename it

        //Ingredient Procedure

        type almost = {
            element: ingredient,
            present: boolean
        }

        const ingredientIsPresent = async (element: ingredient): Promise<almost> => {
            const present = await Ingredient.findOne({id: element.id})
            if(!present) return {element: element, present: false}
            return {element: element, present: true}
        }
        
        const addUnpresentIngredients = async (element: almost): Promise<ingredient> => {
            if(element.present) return element.element
            
            const ingredient = await Ingredient.create({id: element.element.id}).save()
            console.log('ingredient was created: ', ingredient)
            return element.element
        }

        const generateIngredientSQL = (dishVar: number) => (element: ingredient): string => {
            return (
                `INSERT INTO ingredient_lists
                (quantity, quantity_type, "ingredientId", "dishId")
                VALUES
                (${element.quantity.quantity}, '${element.quantity.type}', ${element.id}, ${dishVar});`
                )
            }
        
        const ingredientCompose = (dishId: number) => async (element: ingredient): Promise<string> => {
            const a = await ingredientIsPresent(element)
            const b = await addUnpresentIngredients(a)
            return generateIngredientSQL(dishId)(b)
        }
            
        
        // console.log('here are all the ingredient queries:', ingredientQueries)
        
        //Instructions Procedure
        
        type pre = {
            step: number,
            instruction: string
        }
        
        const generateInstructionSQL = (dishVar: number) => (element: pre): string => (
            `INSERT INTO instructions
            (step, instruction, "dishId")
            VALUES
            (${element.step}, '${element.instruction}', ${dishVar});`)
        
        // console.log("here's all the instruction queries: ", instructionQueries)
        
        const queryReducer = (queries: string[]): string => {
            return queries.reduce((acc, curr) => acc + curr + '\n')
        }
        
        
        //fucking shit I am so god damned close
        const bundleDishQueries = (userId: string) =>
                                  (dishVar: number) => 
                                  (ingredientQueries: string) => 
                                  (instructionQueries: string): string => (
            `${ingredientQueries}
            
            ${instructionQueries}
            
            INSERT INTO user_dishes
            ("userId", "dishId")
            VALUES
            ('${userId}', ${dishVar});
            `
            ) 
            
            
            //TODO: Dependency injection dish_id
            //TODO: Make the read back legible
            
            
            const prebundle = async (name: string) => (
                await Dish.query(`
                INSERT INTO dishes
                (name)
                VALUES
                ('${name}')
                RETURNING id;`)
                )
        
            //okay, I'm doing this the fuckboy way for now
            //TODO: Figure out how to get all of this shit done in a single transaction
            const prebundley = await prebundle(post.name);
            const ready = prebundley[0].id
            
            const ingredientQueries = await Promise.all(post.ingredients.map(ingredientCompose(ready)))
            const instructionQueries = post.instructions.map((value, index) => generateInstructionSQL(ready)({step: index + 1, instruction: value}))
            
            const finalInstructions = queryReducer(instructionQueries)
            const finalIngredients = queryReducer(ingredientQueries)
            
            await Dish.query('BEGIN;')
            const procedure = bundleDishQueries(userId)
            (ready)
            (finalIngredients)
            (finalInstructions) 

            await Dish.query(procedure)
            
            await Dish.query('COMMIT;');
            
            //Should we connect different dishes with different users???
            //We're already connecting different ingredients to different users...
            //TODO: Articulate the read and write trade offs
            //This is a case where having a message queue would totally come in handy
            //Should the instructions be tied to user or dish???
            
        } catch (error) {
            console.log(error)//Send back appropriate error
        }
    }

//TODO: Troubleshoot the RETURNING id AS dish_id

const router = Router()
router.get('/ingredient', myauth,  getIngredients)
router.post('/ingredient', myauth, addIngredient)
router.get('/dish', myauth, getDish)
router.post('/dish', myauth, addDish)

export default router