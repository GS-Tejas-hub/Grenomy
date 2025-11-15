import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/Layout.jsx';
import { Home } from '@/Pages/Home.jsx';
import { Products } from '@/Pages/Products.jsx';
import { AboutUs } from '@/Pages/AboutUs.jsx';
import { Contact } from '@/Pages/Contact.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentPageName="Home">
              <Home />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout currentPageName="Products">
              <Products />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout currentPageName="AboutUs">
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout currentPageName="Contact">
              <Contact />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<AppRouter />);


