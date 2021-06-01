export type Quantity = {
    amount: number,
    unit: string //change this up to enum type at some point
}

export type Nutrition = {
    weightPerServing: Quantity
    calories: Quantity
    protein: Quantity
    fat: Quantity
    carbs:Quantity
}

export type distilledResponse = {
    name: string,
    imageUrl: string, 
    nutrition: Nutrition
}

export type distilledResponse2 = {
    id: number,
    name: string,
    imageUrl: string, 
    nutrition: Nutrition
}

export type searchResult = {
    id: number,
    body: distilledResponse
}

export type IngredientProps = {
    name: string,
    imageUrl: string,
    nutrition: Nutrition,
    quantity: Quantity
}

export type IngredientsInfo = {
    ingredientId: number,
    body: IngredientProps
}

//Let's think on the imageurl situation for this one...
export type DishProps = {
    name: string,
    imageUrl: string,
    ingredients: IngredientsInfo[],
    instructions: string[],
    clicked: boolean
}

export type IdQueryResults = {
    id: number,
    name: string,
    image: string
}