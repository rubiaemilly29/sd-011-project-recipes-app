import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FavoritedRevenues() {
  return (
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <Footer />
    </div>
  );
}