import './App.scss'
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext.tsx';

function App() {
  const currentUser = useAuth();

  console.log(currentUser);

  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children;
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route 
          index 
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }
          />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
