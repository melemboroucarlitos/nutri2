import React from "react"

const MealPlan: React.FC = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <strong className="self-center mb-2">MealPlan</strong>
            <div className="flex flex-col mb-2">
                <div className="flex flex-row space-x-2 border">
                    <a>{/*picture jpg */}</a>
                    <span>Dish Name 1</span>
                    <span>Protein: {}</span>
                    <span>Carbs: {}</span>
                    <span>Fat: {}</span>
                    <button>Cook Dish</button>
                    <button>Delete Meal</button>
                </div>
                <div className="flex flex-row space-x-2 border">
                    <a>{/*picture jpg */}</a>
                    <span>Dish Name 2</span>
                    <span>Protein: {}</span>
                    <span>Carbs: {}</span>
                    <span>Fat: {}</span>
                    <button>Cook Dish</button>
                    <button>Delete Meal</button>
                </div>
            </div>
            <div className="flex flex-col">
                <strong>Nutrition Balance</strong>
                <div className="flex flex-row space-x-2">
                    <span>Protein: {}</span>
                    <span>Carbs: {}</span>
                    <span>Fat: {}</span>
                </div>
            </div>
            <div className="flex flex-row">
                    <input type="text" placeholder="Meal" className="bg-gray-100 rounded"/>
                    <button className="text-white bg-black hover:text-black hover:bg-white">Add Meal</button>
            </div>
        </div>
    )
}

//TODO: Button toggling daily view and weekly/monthly view
//TODO: Edit Meal Plan... Nutritional Balance
//TODO: Toggle time of day for meal

export default MealPlan