import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { AppRoutes } from '../constant/AppRoutes'
import { AuthContext } from '../context/AuthContext'
import Cookies from 'js-cookie';
import Logo from '../assets/Logo.png'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext)

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const obj = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        setLoading(true)
        axios.post(AppRoutes.login, obj).then((data) => {
            Cookies.set("token", data?.data?.data?.token)
            setUser(data?.data?.data?.user)
            setLoading(false)
        }).catch((err) => {
            console.log("err=>", err)
            setLoading(false)
        })

    }

    return (
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 sm:p-10">
            <div className="text-center">
                <a href="#" className="flex items-center justify-center mb-6">
                    <img className="w-10 h-10 mr-2" src={Logo} />
                    <span className="text-2xl font-bold text-gray-800">Login Page</span>
                </a>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign in to your account</h1>
            </div>
            <form className="space-y-6" onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="name@company.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                        <span className="ml-2">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Sign in'}
                </button>
                <p className="text-center text-sm text-gray-600">
                    Don’t have an account yet?{" "}
                    <a href="#" className="text-indigo-600 hover:underline font-medium">Sign up</a>
                </p>
            </form>
        </div>
    </section>
    
    )
}