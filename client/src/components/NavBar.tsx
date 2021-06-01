// import Link from "next/link"
import { useState } from "react"
import AccountDropDown from "./AccountDropdown";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="bg-green-800 sm:flex sm:justify-between sm:px-4 sm:items-center sm:py-3">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 sm:p-0">
                <div className="flex items-baseline">
                    <img className="content-center object-cover w-10 h-10 overflow-hidden rounded-full shadow-md" src="https://cdn5.vectorstock.com/i/1000x1000/12/94/green-leaf-seed-plant-logo-vector-20051294.jpg" alt="Plant logo"/>
                    <span className="ml-1 text-white">Nutri</span>
                </div>
                <div className="sm:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-gray-500 focus:outline-none focus:text-white hover:text-white">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path className={isOpen ? 'inline' : 'hidden'}fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                            <path className={isOpen ? 'hidden' : 'inline'}fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={`${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-4 font-semibold text-white sm:flex`}>
                <a className="block px-2 py-1 rounded hover:bg-gray-800" href="/refrigerator">Refrigerator</a>
                <a className="block px-2 py-1 mt-1 rounded sm:ml-2 sm:mt-0 hover:bg-gray-800" href="/cookbook">Cookbook</a>
                <a className="block px-2 py-1 mt-1 rounded sm:ml-2 sm:mt-0 hover:bg-gray-800" href="/mealplan">MealPlan</a>
                <div className={`${isOpen ? 'hidden' : 'block'} ml-6`}>
                    <AccountDropDown />
                </div>
                <div className="mt-3 border-t-2 border-gray-700 sm:hidden">
                    <div className="flex items-center px-2 py-3">
                        <img className="block object-cover w-8 h-8 overflow-hidden border-2 border-gray-600 rounded-full" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="Your avatar" />
                        <span className="ml-3 font-semibold text-white">Jane Doe</span>
                    </div>
                    <div className="">
                        <a className="block px-2 py-1 font-hairline text-gray-500 hover:text-white focus:outline-none"href="#">Account Settings</a>
                        <a className="block px-2 py-1 font-hairline text-gray-500 hover:text-white focus:outline-none"href="#">Support</a>
                        <a className="block px-2 py-1 font-hairline text-gray-500 hover:text-white focus:outline-none"href="#">Sign out</a>
                    </div>
                </div>
            </nav>
     </header>
    )
}

export default NavBar


        // <div className="fixed flex flex-col justify-between w-48 h-screen bg-gray-200">
        //     <div className="flex flex-col space-y-4">
        //         <Link href="/refrigerator">
        //             Refrigerator
        //         </Link>
        //         <Link href="/cookbook">
        //             Cookbook
        //         </Link>
        //         <Link href="/mealplan">
        //             Mealplan
        //         </Link>
        //         <Link href="/profile">
        //             Profile
        //         </Link>
        //     </div>
        //     <button className="text-white bg-black hover:text-black hover:bg-white">Log Out</button>
        // </div>