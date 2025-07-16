import './App.css';
import Layout from './components/Layout';
import { getToken } from './utils/auth';
import AuthPage from './pages/AuthPage';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() =>{
    async function checkToken() {
      const token = await getToken();
      setLoggedIn(!!token);
    }
    checkToken();
  }, []);


  return (
    
      loggedIn ? <Layout/>: <AuthPage/>
    
  )
}

export default App
