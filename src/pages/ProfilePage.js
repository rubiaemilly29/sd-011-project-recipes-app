import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

export default function ProfilePage() {
  document.title = 'Perfil';
  function getItem() {
    return localStorage.getItem('user');
  }

  return (
    <div className="body-b">
      <Header />
      <p data-testid="profile-email">{getItem()}</p>
      <Link
        to="/receitas-feitas"
      >
        <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
      </Link>
      <Link
        to="/receitas-favoritas"
      >
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link
        to="/"
      >
        <button
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
          type="button"
        >
          Sair
        </button>
      </Link>
      <FooterMenu />
    </div>
  );
}