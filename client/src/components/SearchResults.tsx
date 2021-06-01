import axios from "axios";
import { useState } from "react";
import { distilledResponse2, Quantity } from "../types";

type ingredientPost = {
    foodId: number,
    quantity:{
        quantity: number,
        quantityType: string
    }
}

const SearchResults = (ingredient: distilledResponse2) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const [amount, setAmount] = useState<number>(undefined);
    const [unit, setUnit] = useState<string>('g'); //make up a real enum type for unit

    const submitIngredient = (e) => {
        //prevent default
        e.preventDefault();

        //add to database --- leaves the question of how we can make sure that this is received??
        axios.post('food/ingredient', {
            foodId: ingredient.id,
            quantity: {
                quantity: amount,
                quantityType: unit
            }
        }, {withCredentials: true})

        //update view
    }
    
    //TODO: Add that cool functionality that if you click out of it you are brought out of it
    return (
        <div className="flex pb-1">
            <button className="focus:outline-none" onClick={() => setClicked(!clicked)}>
                <img className="object-cover w-8 h-8 shadow-md" src={ingredient.imageUrl} alt={ingredient.name} />
                <div className="flex flex-col items-center ml-2 w-96">
                    <span className="font-semibold">{ingredient.name}</span>
                    <div className="flex text-sm font-light text-gray-400">
                        <span className="flex-none ">Calories: {ingredient.nutrition.calories.amount.toString() + ingredient.nutrition.calories.unit}</span>
                        <span className="flex-none ml-2">Protein: {ingredient.nutrition.protein.amount.toString() + ingredient.nutrition.protein.unit}</span>
                        <span className="flex-none ml-2">Fat: {ingredient.nutrition.fat.amount.toString() + ingredient.nutrition.fat.unit}</span>
                        <span className="flex-none ml-2">Carbs: {ingredient.nutrition.carbs.amount.toString() + ingredient.nutrition.carbs.unit}</span>
                    </div>
                </div>
            </button>
            <div className={`${clicked ? 'flex' : 'hidden'} items-baseline`}>
                <span className="flex-none ml-2 text-sm">Amount:</span>
                <div className="flex flex-col">
                    <div className="flex items-baseline ml-1">
                        <input onChange={e => setAmount(parseFloat(e.target.value))} value={amount} type="number" className="w-8 h-6 input" />
                        <select onChange={e => setUnit(e.target.value)} value={unit} className="w-10 h-6 ml-1" name="quantity" id="quantity">
                            <option value="g">g</option>
                            <option value="oz">oz</option>
                        </select>
                    </div>
                    <button onClick={(e) => submitIngredient(e)} className="w-24 h-8 btn">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SearchResults;
