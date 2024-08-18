import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined, make sure AuthProvider is used.');
  }

  const { user } = authContext;

  return (
    <div>
      {user ? (
        <>
        <Dashboard/>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default App;