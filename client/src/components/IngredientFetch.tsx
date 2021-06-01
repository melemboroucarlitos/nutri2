import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { IdQueryResults, IngredientsInfo, distilledResponse, searchResult } from "../types"

const IngredientFetch: React.FC = () => {
    //TODO: Create an auth context and put this apiKey inside of it
    const apiKey = 'a55885aef72b49f3bc5ca67125572d1d';
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<searchResult[]>([]);
    
    const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout>(undefined);

    const ingredientInformationQuery = (id: number): Promise<AxiosResponse<any>> => axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=1`,{withCredentials: false})

    const ingredientIdQuery = (amount: number) => (food: string): Promise<AxiosResponse<any>> => axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${food}&number=${amount}`, {withCredentials: false})

    const imageUrl = (image: string): string => `https://spoonacular.com/cdn/ingredients_100x100/${image}`

    const distilledResponse = (response: AxiosResponse<any>): distilledResponse => {//Let's put the api key in session storage when they log in, or perhaps we can embed it into the json token itself
        const weightPerServing = response.data.nutrition.weightPerServing.amount.toString() + response.data.nutrition.weightPerServing.unit
        const nutrients = response.data.nutrition.nutrients;
        //do something with response.data.categoryPath[0]
  
        console.log('this is the response: ', response.data)
        return {//Name is actually defined by the user????
                name: response.data.name,
                imageUrl: imageUrl(response.data.image),
                nutrition: {
                  weightPerServing: { amount: weightPerServing, unit: 'kcal' }, //make the unit dynamic
                  calories: { amount: nutrients.filter(nutrient => nutrient.name === 'Calories')[0].amount, unit: nutrients.filter(nutrient => nutrient.name === 'Calories')[0].unit },
                  protein: { amount: nutrients.filter(nutrient => nutrient.name === 'Protein')[0].amount, unit: nutrients.filter(nutrient => nutrient.name === 'Protein')[0].unit },
                  carbs: { amount: nutrients.filter(nutrient => nutrient.name === 'Carbohydrates')[0].amount, unit: nutrients.filter(nutrient => nutrient.name === 'Carbohydrates')[0].unit },
                  fat: { amount: nutrients.filter(nutrient => nutrient.name === 'Fat')[0].amount, unit: nutrients.filter(nutrient => nutrient.name === 'Fat')[0].unit },
                }
            }
      }

    const fetchIngredients = async () => {
        console.log('boom!') //troubleshooting the appropriate time delay
        //look up items
        const response = await ingredientIdQuery(2)(search);
        const goody: IdQueryResults[] = response.data.results
        const prep = goody.map(async first => ({
            id: first.id,
            body: await ingredientInformationQuery(first.id)
        }))
        const value = await Promise.all(prep)
        const val = value.map(bla => ({
            id: bla.id,
            body: distilledResponse(bla.body)
        }))

        setSearchResults(val)
    }

    useEffect(() => {
        clearTimeout(lastTimeout);
        
        if(search !== '') {
            setLastTimeout(setTimeout(() => {
                fetchIngredients();
            }, 100)) //troubleshoot the appropriate time delay
        }
        
    },[search])

    return (
        <div>
        </div>
    )
}

export default IngredientFetch;
