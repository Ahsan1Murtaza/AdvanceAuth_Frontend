
import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashBoard from './pages/DashBoard'
import { authStore } from './store/authStore'

const ProtectedRoute = ( { children} ) => {
  const {isAuthenticated, user} = authStore()

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />
  }

  return children
}


// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = authStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};


const App = () => {

  return (
    <div
			className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />


      <Routes>
        <Route path='/' element = {<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/signup' element = {<RedirectAuthenticatedUser><SignUp /></RedirectAuthenticatedUser>} />
        <Route path='/login' element = {<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element = {<VerifyEmail />} />
        <Route path='/forgot-password' element = {<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token' element = {<RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>} />
        
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
		</div>
  )
}

export default App