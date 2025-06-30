import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await apiClient.post('/api/client/register', {
        email,
        password,
        name,
        contactPhone,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="register-page">
      <h2>Регистрация</h2>
      <input
        type="text"
        placeholder="Имя*"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Телефон (необязательно)"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
}

export default Register;