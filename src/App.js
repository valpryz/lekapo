import Dashboard from './Dashboard'
import Login from './Login'
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter } from 'react-router-dom'

function App() {
  const { authIsReady,user } = useAuthContext()
  return (
    <>
      {authIsReady &&(
      <BrowserRouter>
          {!user ? <Login /> : <Dashboard />}
      </BrowserRouter>
   )}
    </>
  );
}

export default App;
