
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined, make sure AuthProvider is used.');
  }

  const { login, register } = authContext;

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      await login(username, password);
    } else {
      await register(username, password);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleAuthAction}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isLoginMode ? 'Login' : 'Register'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isLoginMode
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;