import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const RegisterPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default RegisterPage;
