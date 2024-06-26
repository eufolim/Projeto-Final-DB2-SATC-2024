import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Sistema de Gestão de Estacionamento</h1>
      <nav>
        <ul>
          <li><Link href="/pages/vehicles">Gerenciamento de Veículos</Link></li>
          <li><Link href="/pages/Spots">Gerenciamento de Vagas</Link></li>
          <li><Link href="/pages/parkings">Gerenciamento de Estacionamentos</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
