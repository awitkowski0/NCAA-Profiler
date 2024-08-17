import TestTable from './components/Table';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined, make sure AuthProvider is used.');
  }

  const { user, logout } = authContext;

  return (
    <div>
      {user ? (
        <><TestTable /><div style={{ textAlign: 'center', padding: '20px' }}>
          
          <h1>Welcome, {user.username}</h1>
          <button
            onClick={logout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div></>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default App;