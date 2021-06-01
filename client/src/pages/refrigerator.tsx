import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"

import { IdQueryResults, IngredientsInfo, distilledResponse, searchResult } from "../types"
import Ingredient from "../components/Ingredient"
import SearchResults from "../components/SearchResults";

type DBentry = {
    ingredientId: number,
    quantity: number,
    quantity_type: string //make enum for quantityType
}


const Refrigerator: React.FC = () => {
    const apiKey = 'a55885aef72b49f3bc5ca67125572d1d';
    
    const [ingredients, setIngredients] = useState<DBentry[]>([]);
    const [ingredientsInfo, setIngredientsInfo] = useState<IngredientsInfo[]>([]);
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<searchResult[]>([]);
    
    const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout>(undefined);

    //Let's do some validating on that axios response there son
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

    const ingredientInfo = async (id: number): Promise<distilledResponse> => {
        return distilledResponse(await ingredientInformationQuery(id))
    }
    
    //componentDidMount
    useEffect(() => {
        (async () => {
            const response = await axios.get('/food/ingredient', {withCredentials: true})
            await setIngredients(response.data)
        })();
    },[])

    //Ingredients
    useEffect(() => {
        (async () => {
            const value: Promise<IngredientsInfo>[] = ingredients.map(async ingredient => {
                const stooge = await ingredientInfo(ingredient.ingredientId)
    
                return {
                    ingredientId: ingredient.ingredientId,
                    body: {
                        ...stooge,
                        quantity: {
                            amount: ingredient.quantity,
                            unit: ingredient.quantity_type
                        }
                    }
                }
            })

            const here = Promise.all(value)
            const now = await here

            setIngredientsInfo(now)
        })();
    },[ingredients])

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
        <div className="items-center block">
            <div className="flex flex-col">
                <h4 className="self-center text-xl font-semibold text-green-900">Refrigerator</h4>
                <div className="flex">
                    {ingredientsInfo && ingredientsInfo.map((info, index) => (
                        <div key={info.ingredientId} className={`h-32 w-60 p-2 ${index !== 1 ? 'ml-2' : ''}`}>
                            <Ingredient name={info.body.name}
                                        imageUrl={info.body.imageUrl}
                                        nutrition={info.body.nutrition}
                                        quantity={{
                                            amount: info.body.quantity.amount,
                                            unit: info.body.quantity.unit
                                        }}/>
                        </div>
            ))}
                </div>
            </div>
            <div className="flex flex-col px-4 pb-4 mt-56">
                <h4 className="self-center text-xl font-semibold text-green-900">Add Ingredient</h4>
                <div className="block mt-2">
                    <label htmlFor="search" className="mt-2 text-sm">Search ingredient</label>
                    <input onChange={e => setSearch(e.target.value)} value={search} className="bg-gray-200 input" type="text" id="search" name="search"/>
                </div>
                <div className="w-auto mt-4 bg-gray-200 rounded-lg shadow-lg ">
                    {searchResults && searchResults.map((result, index) => (
                        <div className={`mt-2 transition duration-300 ease-in-out hover:shadow-md`} key={result.id}>
                            <SearchResults id={result.id}
                                           name={result.body.name}
                                           imageUrl={result.body.imageUrl}
                                           nutrition={result.body.nutrition} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Refrigerator