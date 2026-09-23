import { useState } from 'react';

import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

type Page = 'shop' | 'admin';

const App = () => {
  const [page, setPage] =
    useState<Page>('shop');

  return (
    <>
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;