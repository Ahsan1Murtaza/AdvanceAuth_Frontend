import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail, User } from "lucide-react"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router-dom"
import { authStore } from "../store/authStore"



const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const {isLoading, error, signup} = authStore()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(name, email, password)
            navigate('/verify-email')
        } catch (error) {
            console.error("Signup failed:", error)
        }
    }

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
    >

        <div className="p-8">
            
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <Input icon={User} type = 'text' placeholder = "Full Name" value = {name} onChange = {(e) => setName(e.target.value)}/>
                <Input icon={Mail} type = 'text' placeholder = "Email Address" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <Input icon={Lock} type = 'text' placeholder = "Password" value = {password} onChange = {(e) => setPasword(e.target.value)}/>

                {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

                <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 cus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2  focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				type='submit'
                disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                        ) : (
                        "Sign Up"
                        )}
                </motion.button>
            </form>
        </div>

        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>Already have an account? {' '}
                <Link to={'/login'}  className='text-green-400 hover:underline'>Login</Link>
            </p>
        </div>
    </motion.div>
  )
}

export default SignUp