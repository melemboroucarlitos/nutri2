import React from "react"

const Profile: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
                <strong className="text-xl text-black uppercase">Personal Info</strong>
            <div>
                <span className="text-xl">Daily Nutritional Needs</span><br/>
                <span className="text-l">Protein: {}</span><br/>
                <span className="text-l">Carbs: {}</span><br/>
                <span className="text-l">Fats: {}</span><br/>
            </div>
            <span className="text-sm text-black">Edit</span>
            <form className="flex flex-col" action="">
                <input placeholder="height" type="number"/>
                <input placeholder="weight" type="number"/>
                <input placeholder="age" type="number"/>
                <span className="text-black uppercase text-l">
                Weight Goals
                </span>
                <label>Gain</label>
                <input type="radio" id="male" name="gender" value="male"/>
                <label>Maintain</label>
                <input type="radio" id="female" name="gender" value="female"/>
                <label>Lose</label>
                <input type="radio" id="other" name="gender" value="other"/>
                <button className="mt-2 text-white uppercase bg-black hover:text-black hover:bg-white">Sign Up</button>
            </form>
        </div>
    )
}

//TODO: Have a daily needs and a meal plan compared to daily needs

export default Profile