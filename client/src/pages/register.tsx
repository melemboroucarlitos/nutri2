import { useRouter } from "next/dist/client/router"
import React, { FormEvent, useState } from "react"
import axios from "axios"

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('/auth/register', {email, username, password})
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
            <div className="flex flex-col mt-32 -ml-5">
                <img className="content-center object-cover w-32 h-32 ml-6 overflow-hidden rounded-full shadow-md" src="https://cdn5.vectorstock.com/i/1000x1000/12/94/green-leaf-seed-plant-logo-vector-20051294.jpg" alt="Plant logo"/>
                <h1 className="mt-1 text-2xl font-semibold text-green-800 ml-14">Nutri</h1>                                
            </div>
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-lg font-semibold">Create your account</h1>                
                <span className="text-sm font-hairline text-gray-800">Already registered? <a className="text-green-700" href="/login">Sign In</a></span>
                <form className="flex flex-col p-4 mt-5 bg-green-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <label className="text-sm" htmlFor="email">Email Address</label>
                    <input className="w-full px-2 py-1 rounded-md shadow-sm" id="email" name="email" type="email" onChange={e => setEmail(e.target.value)}/>
                    <label className="mt-2 text-sm" htmlFor="username">Username</label>
                    <input className="w-full px-2 py-1 rounded-md shadow-sm" id="username" name="username" type="text" onChange={e => setUsername(e.target.value)}/>
                    <label className="mt-2 text-sm" htmlFor="password">Password</label>
                    <input className="w-full px-2 py-1 rounded-md shadow-sm" id="password" name="password" type="password" onChange={e => setPassword(e.target.value)}/>
                    <button className="p-1 mt-4 mb-1 uppercase bg-green-700 border border-green-200 rounded-md shadow-lg focus:outline-none focus:border-green-900">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register