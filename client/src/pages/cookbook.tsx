import axios from "axios";
import React, { useEffect, useState } from "react"

import Dish from "../components/Dish";
import { searchResult } from "../types";


const Cookbook: React.FC = () => {
    const [dishName, setDishName] = useState<string>('');
    
    const [ingredientSearch, setIngredientSearch] = useState<string>('')
    const [ingredientSearchResults, setIngredientSearchResults] = useState<searchResult[]>([]);
    const [ingredients, setIngredients] = useState<Array<any>>([]); //define type
    
    const [instructionInput, setInstructionInput] = useState<string>('');
    const [instructions, setInstructions] = useState<Array<string>>([]);

    const [pictureSearch, setPictureSearch] = useState<string>('');
    const [pictureSearchResults, setPictureSearchResults] = useState<string[]>([]);    
    const [pictureUrl, setPictureUrl] = useState<string>('');

    const addInstruction = (e): void => {
        e.preventDefault();

        setInstructions(instructions.concat(instructionInput));
        setInstructionInput('')
    }

    const deleteInstruction = (recIndex: number): void => {
        setInstructions(instructions.filter((_, index) => index !== recIndex))
    }

    const addIngredient = (e): void => {

    }

    //Think clearly on what restrictions and validations we want to have on dishSaving, and how we can best guide the user with this
    const saveDish = async (e) => {

        e.preventDefault();

        const ingredientSend = ingredients.map(ingredient => {
            return {
                id: ingredient.ingredient,
                quantity: ingredient.quantity
            }
        })

        await axios.post('/food/dish',{
            name: dishName,
            instructions: instructions,
            ingredients: ingredientSend
        })

        //once we confirm, clear out all input and update local dish state
    }

    //componentDidMount
    useEffect(() => {
        axios.get('/food/dish')
        .then(res => console.log('this is what the dish response looks like: ', res))
        .catch(err => console.log(err))
    },[])

    return (
        <div className="flex flex-col">
            <strong className="self-center mb-2">Cookbook</strong>
            <div>
                <Dish bla={"linguine pastrami"} />
            </div>
            <div className="mt-4">
                <Dish bla={"linguine pastrami"} />
            </div>
            <div className="flex flex-col items-center mt-2 space-y-2">
                <strong>Create Dish</strong>
                <div>
                    <label htmlFor="dishName">Name</label>
                    <input className="bg-gray-200 input" value={dishName} onChange={e => setDishName(e.target.value)} type="text" id="dishName" name="dishName" />
                    <form onSubmit={e => addIngredient(e)}>
                        <label htmlFor="ingredientSearch">Ingredients</label>
                        <input className="bg-gray-200 input" value={ingredientSearch} onChange={e => setIngredientSearch(e.target.value)} type="text" id="ingredientSearch" name="ingredientSearch" />
                        <div>
                                {/* This is the ingredient list */}
                                {ingredientSearchResults && ingredientSearchResults.map(ingredient => {

                                })}
                        </div>
                    </form>
                    <form onSubmit={e => addInstruction(e)}>
                        <label htmlFor="instructions">Instructions</label>
                        <div className="flex">
                            <input className="bg-gray-200 input" value={instructionInput} onChange={e => setInstructionInput(e.target.value)} type="text" id="instructions" name="instructions" />
                            <button className="btn">Add Instruction</button>
                        </div>
                    </form>
                    <label htmlFor="pictureUrl">Picture Url</label>
                    <input className="bg-gray-200 input" value={pictureSearch} onChange={e => setPictureSearch(e.target.value)} type="text" id="pictureUrl" name="pictureUrl" />
                    <div>
                        {/* This is the picture list */}
                        {pictureSearchResults && pictureSearchResults.map(picture => {

                        })}
                    </div>
                    <button className="btn" onClick={e => saveDish(e)}>Save Dish</button>
                    <button className="btn" onClick={() => console.log(instructions)}>See Instructions</button>
                    <div>
                        <div>
                            <h2>Ingredients</h2>
                            {/* This is the ingredient list */}
                            {ingredients && ingredients.map(ingredient =>  {
                                  
                            })}
                        </div>
                        <div>
                            {/* Styling where the input looks like it's part of the instruction list! */}
                            {/* No background, underlined, hairline weight, grayed-out, */}
                            {/* This is the instruction list */}
                            <h2>Instructions</h2>
                            {instructions && instructions.map((instruction, index) => {
                                <div key={index} className="flex">
                                    <span>{`${index + 1}. ${instruction}`}</span>
                                    <button onClick={() => deleteInstruction(index)} className="btn">Delete Me</button>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cookbook

//TODO: Dynamic adding of ingredients