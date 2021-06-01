import { DishProps } from "../types";

const Dish: React.FC<{bla: string}> = (dish: {bla: string}) => {
    const property = {
      name: 'Garlic Shrimp Pasta',
      imageUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1719183.jpg&w=596&h=596&c=sc&poi=face&q=85',
      ingredients: [
          {
            name: 'Parmesa Cheese',
            nutrition: {
              weightPerServing: {
                amount: 235,
                unit: 'g'
              },
              calories: {
                amount: 54,
                unit: 'oz'
              },
              protein: {
                amount: 8,
                unit: 'g'
              },
              fat: {
                amount: 50.5,
                unit: 'g'
              },
              carbs: {
                amount: 6,
                unit: 'g'
              },
            },
            quantity: {
              amount: 5,
              unit: 'oz'
            }
        },
        {
          name: 'Butter',
          nutrition: {
            weightPerServing: {
              amount: 235,
              unit: 'g'
            },
            calories: {
              amount: 54,
              unit: 'oz'
            },
            protein: {
              amount: 8,
              unit: 'g'
            },
            fat: {
              amount: 50.5,
              unit: 'g'
            },
            carbs: {
              amount: 6,
              unit: 'g'
            },
          },
          quantity: {
            amount: 5,
            unit: 'oz'
          }
        },
        {
          name: 'Garlic',
          nutrition: {
            weightPerServing: {
              amount: 235,
              unit: 'g'
            },
            calories: {
              amount: 54,
              unit: 'oz'
            },
            protein: {
              amount: 8,
              unit: 'g'
            },
            fat: {
              amount: 50.5,
              unit: 'g'
            },
            carbs: {
              amount: 6,
              unit: 'g'
            },
          },
          quantity: {
            amount: 5,
            unit: 'oz'
          }
        },
        {
          name: 'Shrimp',
          nutrition: {
            weightPerServing: {
              amount: 235,
              unit: 'g'
            },
            calories: {
              amount: 54,
              unit: 'oz'
            },
            protein: {
              amount: 8,
              unit: 'g'
            },
            fat: {
              amount: 50.5,
              unit: 'g'
            },
            carbs: {
              amount: 6,
              unit: 'g'
            },
          },
          quantity: {
            amount: 5,
            unit: 'oz'
          }
        },
        {
          name: 'Vegetable Oil',
          nutrition: {
            weightPerServing: {
              amount: 235,
              unit: 'g'
            },
            calories: {
              amount: 54,
              unit: 'oz'
            },
            protein: {
              amount: 8,
              unit: 'g'
            },
            fat: {
              amount: 50.5,
              unit: 'g'
            },
            carbs: {
              amount: 6,
              unit: 'g'
            },
          },
          quantity: {
            amount: 5,
            unit: 'oz'
          }
        },
        {
          name: 'Vermicelli Pasta',
          nutrition: {
            weightPerServing: {
              amount: 235,
              unit: 'g'
            },
            calories: {
              amount: 54,
              unit: 'oz'
            },
            protein: {
              amount: 8,
              unit: 'g'
            },
            fat: {
              amount: 50.5,
              unit: 'g'
            },
            carbs: {
              amount: 6,
              unit: 'g'
            },
          },
          quantity: {
            amount: 5,
            unit: 'oz'
          }
        },      
      ],
      instructions: [
        'Cook pasta in a large pot of boiling water with vegetable oil until al dente.',
        'Meanwhile, place the shrimp in boiling salted water for 3 to 5 minutes, just until they turn pink. Cooking time will depend on the size of the shrimp. Remove the tails, and place in a bowl of warm water.',
        'In a microwave safe bowl, mix butter or margarine and minced garlic. Microwave on high for 45 seconds, or until melted. Stir.',
        'Drain pasta, and transfer to a serving dish. Toss with garlic butter and shrimp. Sprinkle with grated Parmesan cheese. Serve warm.'
      ],
      clicked: false
    }
    
    const reducer = (key: string) => (arr: Array<any>): number => {
      let acc: number = 0;

      arr.forEach(curr => {
        acc += curr.nutrition[key].amount
      })

      return acc
    } 

    return (
      <div className="p-4">
        <div className="relative overflow-hidden rounded-lg shadow-md pb-4/5">
          <img className="absolute object-cover w-full h-full" src={property.imageUrl} alt={property.name}/>
        </div>
        <div className="relative px-4 -mt-16">
          <div className="px-6 py-4 bg-white rounded-lg shadow-lg">
            <h4 className="mt-2 text-lg font-semibold leading-tight">{property.name}</h4>
            <div className="flex flex-row items-baseline">
              <div className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                {reducer('calories')(property.ingredients)} calories
                <span> &#8226; </span> 
                {reducer('protein')(property.ingredients)} protein
                <span> &#8226; </span> 
                {reducer('fat')(property.ingredients)} fat
                <span> &#8226; </span> 
                {reducer('carbs')(property.ingredients)} carbs
              </div>
            </div>
            <div className="mt-1">
              {/*Let's rethink this hierarchy real quick */}
              {reducer('weightPerServing')(property.ingredients)}
              <span className="text-xs text-gray-600"> gs</span> / serving 
            </div>
              <div className={property.clicked ? 'block' : 'hidden'}>
                <div className="mt-8">
                  <h2 className="text-lg font-medium leading-normal tracking-wider">Ingredients</h2>
                  <div className="flex flex-col items-start mt-3">
                    {property.ingredients.map((ingredient, index) => (
                      <div className={`${index !== 0 ? 'mt-2' : ''} flex`}>
                        <img className="object-cover w-12 h-12 rounded-lg shadow-md" src={property.imageUrl} alt={ingredient.name} />
                        <div className="flex flex-col items-center ml-1 w-80">
                            <span className="font-thin">{ingredient.name}</span>
                            <div className="flex text-sm font-light text-gray-400">
                                <span className="flex-none ">Calories: {ingredient.nutrition.calories.amount.toString() + ingredient.nutrition.calories.unit}</span>
                                <span className="flex-none ml-2">Protein: {ingredient.nutrition.protein.amount.toString() + ingredient.nutrition.protein.unit}</span>
                                <span className="flex-none ml-2">Fat: {ingredient.nutrition.fat.amount.toString() + ingredient.nutrition.fat.unit}</span>
                                <span className="flex-none ml-2">Carbs: {ingredient.nutrition.carbs.amount.toString() + ingredient.nutrition.carbs.unit}</span>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pb-4 mt-14">
                  <h2 className="text-lg font-medium leading-normal tracking-wider">Instructions</h2>
                  <div className="flex flex-col items-start mt-2">
                    {property.instructions.map((instr, index) => (
                      <span className={`${index !== 0 ? 'mt-2' : ''} font-light text-md`}>{index + 1}. {instr}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }

export default Dish;

//TODO: Aspect ratio and information animations
//Idea! Have the image of the ingredient be a picture with the information on white text against it???