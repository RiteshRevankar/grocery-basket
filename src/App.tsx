import { useState } from 'react';

import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';

import './App.css';

type Page = 'shop' | 'admin';

const App = () => {
  const [page, setPage] =
    useState<Page>('shop');

  return (
    <div className="app">
      {page === 'shop' ? (
        <ShopPage
          onAdminClick={() =>
            setPage('admin')
          }
        />
      ) : (
        <AdminPage
          onBack={() =>
            setPage('shop')
          }
        />
      )}
    </div>
  );
};

export default App;