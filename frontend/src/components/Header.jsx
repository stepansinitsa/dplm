import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="logo">HotelHub</Link>

        <div className="auth-nav">
          {!isAuthenticated ? (
            <>
              <Link to="/login">Вход</Link>
              <Link to="/register">Регистрация</Link>
            </>
          ) : (
            <>
              <span>Привет, {user.name}</span>
              {user.role === 'client' && <Link to="/dashboard">Мои брони</Link>}
              {user.role === 'manager' && <Link to="/manager/support-chats">Чаты</Link>}
              {user.role === 'admin' && <Link to="/admin">Админка</Link>}
              <Link to="/support-chat">Чат поддержки</Link>
              <button onClick={() => window.location.href = '/api/auth/logout'}>
                Выход
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;