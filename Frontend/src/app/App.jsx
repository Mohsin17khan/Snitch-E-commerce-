import '../../src/App.css'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

function App() {
 
  const { handleGetme } = useAuth();
  useEffect(()=>{
    handleGetme()
  },[])
  return (
    <RouterProvider router={router} />
    
  )
}

export default App
