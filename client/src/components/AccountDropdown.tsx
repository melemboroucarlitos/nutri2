import { useEffect, useState } from "react"

const AccountDropDown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    

    //revoew useEffect to see if this effect is really what you want to happen
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Esc' || e.key === 'Escape') setIsOpen(false)
        }

        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    })

    //TODO: Fix height bug when transitioning into sm
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="relative z-10 block w-8 h-8 overflow-hidden border-2 border-gray-600 rounded-full hover:border-white focus:outline-none focus:border-white">
                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="Your avatar" />
            </button>
            <button onClick={() => setIsOpen(false)} tabIndex={-1} className={`${isOpen ? 'block' : 'hidden'} cursor-default bg-black opacity-25 fixed h-full w-full inset-0`}/>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl z-10`}>
                <a className="block px-4 py-2 text-gray-800 focus:outline-none focus:bg-indigo-500 hover:bg-indigo-500 hover:text-white"href="#">Account Settings</a>
                <a className="block px-4 py-2 text-gray-800 focus:outline-none focus:bg-indigo-500 hover:bg-indigo-500 hover:text-white"href="#">Support</a>
                <a className="block px-4 py-2 text-gray-800 focus:outline-none focus:bg-indigo-500 hover:bg-indigo-500 hover:text-white"href="#">Sign out</a>
            </div>
        </div>
    )
}

export default AccountDropDown