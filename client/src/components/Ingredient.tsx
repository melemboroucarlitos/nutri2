import { useEffect, useState } from "react"
import NutritionChart from "./NutritionChart"

import { Nutrition, IngredientProps, Quantity } from "../types"
  
const Ingredient: React.FC<IngredientProps> = (ingredient: IngredientProps) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const [quantity, setQuantity] = useState<number>(ingredient.quantity.amount);
    const [quantityUnit, setQuantityUnit] = useState<string>(ingredient.quantity.unit);

    const [quantityForm, setQuantityForm] = useState<number>(ingredient.quantity.amount);
    const [quantityUnitForm, setQuantityUnitForm] = useState<string>(ingredient.quantity.unit);

    const editQuantity = ()=> {
      setClicked(!clicked)
    }
    
    const cancelQuantityUpdate = e => {
      e.preventDefault();
      setClicked(!clicked)
    }
    
    const updateQuantity = e => {//Delete it, or do not display it if it equals 0
      e.preventDefault();
      console.log('Quantity updated')
      //We will soon update the state
      setQuantity(quantityForm)
      setQuantityUnit(quantityUnitForm)
      //And then we will update the db
      //And then we will flip the card over
      setClicked(!clicked)
    }
   
    const quantityPrinter = (quant: Quantity): string => quant.amount.toString() + quant.unit

    const fetchInfoMock = (id: number) => ({
              image: 'shrimp.jpg',
              nutrients: {
                weightPerServing: { quantity: 6, unit: 'g' },
                calories: { quantity: 21, unit: 'kcal' },
                protein: { quantity: 13, unit: 'g' },
                carbs: { quantity: 32, unit: 'g' },
                fat: { quantity: 45, unit: 'g' },
              }
    })
    
    //Change up image display
    return (
      <div className="overflow-hidden border rounded-lg shadow-xl hover:shadow-2xl group">
        <div className={`${clicked ? 'hidden' : 'block'}`}>
          <div className="relative overflow-hidden pb-3/5">
            <img className="absolute object-cover w-full h-full" src={ingredient.imageUrl} alt={'some alt text for now, will resolve once name is resolved'} />
          </div>
          <div>
            <div className="p-6 bg-white">
              <div className="flex items-baseline">
                <h4 className="text-lg font-semibold leading-tight">{ingredient.name}</h4>
                <div className="ml-2">
                  <span>{quantity}</span>  
                  <span className="text-sm text-gray-600">{` ${quantityUnit}`}</span>
                </div>
                <NutritionChart className="self-start w-4 h-4 ml-2 -mt-2 justify-self-end "
                                data={{
                                  labels: ['Protein', 'Fats', 'Carbs'],
                                  datasets: [
                                      {
                                          label: '# of Votes',
                                          data: [
                                            ingredient.nutrition.protein.amount,
                                            ingredient.nutrition.fat.amount,
                                            ingredient.nutrition.carbs.amount,
                                          ],
                                          backgroundColor: [
                                              'rgba(255, 99, 132, 0.2)',
                                              'rgba(54, 162, 235, 0.2)',
                                              'rgba(255, 206, 86, 0.2)',
                                          ],
                                          borderColor: [
                                              'rgba(255, 99, 132, 1)',
                                              'rgba(54, 162, 235, 1)',
                                              'rgba(255, 206, 86, 1)',
                                          ],
                                          borderWidth: 1
                                      }
                                  ]
                                }}
                                options={{
                                  maintainAspectRatio: false,
                                  animation: {
                                    duration: 0
                                  },
                                  plugins: {
                                    legend: {
                                      display: false
                                    },
                                    tooltips: {
                                      enabled: false
                                    }
                                  }
                                }} />
              </div>
              <div className="items-center hidden mt-2 group-hover:flex">
                <span>{ingredient.nutrition.weightPerServing.amount.toString() + ingredient.nutrition.weightPerServing.unit} / serving</span>
                {/*Break up the span below into a niceness using quantity printer*/}
                <span className="ml-2 text-sm text-gray-600"> calories: {ingredient.nutrition.calories.amount} protein: {ingredient.nutrition.protein.amount} fat: {ingredient.nutrition.fat.amount} carbs: {ingredient.nutrition.carbs.amount} </span>
                <span className="ml-2 text-xs text-blue-500 cursor-pointer justify-self-end" onClick={editQuantity}>Edit</span>
              </div>
            </div>
          </div>
        </div>
        <form className={`${clicked ? 'block' : 'hidden'}`}>
          <div className="flex">
            <div className="flex flex-col">
              <label className="mt-2 text-xs" htmlFor="quantity">Quantity</label>
              <input className="w-16 px-2 py-1 mt-1 rounded-md shadow-sm appearance-none focus:outline-none focus:border-green-800" type="number" id="quantity" name="quantity" value={quantityForm} onChange={e => setQuantityForm(parseFloat(e.target.value))}/>
            </div>
            <div className="flex flex-col ml-2">
              <label className="mt-2 text-xs" htmlFor="quantity_type">Unit</label>
              <select className="w-16 px-2 py-1 mt-1 rounded-md shadow-sm appearance-none focus:outline-none focus:border-green-800" id="quantity_type" name="quantity_type" value={quantityUnitForm} onChange={e => setQuantityUnitForm(e.target.value)}>
                <option value="g">g</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <button className="btn" onClick={e => updateQuantity(e)}>Update</button>
            {/*Soon, we will turn the button bellow into a link, and add a delete button */}
            <button className="bg-gray-400 btn" onClick={e => cancelQuantityUpdate(e)}>Cancel</button>
          </div>
        </form>
    </div>
    )
}

export default Ingredient