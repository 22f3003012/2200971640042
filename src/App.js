import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import RedirectHandler from './components/RedirectHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;

