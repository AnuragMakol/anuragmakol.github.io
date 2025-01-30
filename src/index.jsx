import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

// Integrate Custom Styling
import './style/app.css';

// Query Client Init
const queryClient = new QueryClient();

// Pages
import { Homepage } from './pages/homepage';
import { Privacy } from './pages/privacy';
import { Terms } from './pages/terms';
import { Cartplus } from './pages/cartplus/cartplus';
import { CartplusTerms } from './pages/cartplus/terms';
import { CartplusPrivacy } from './pages/cartplus/privacy';

// Error Page
import { Error404 } from './pages/error404';

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cartplus" element={<Cartplus />} />
          <Route path="/cartplus/privacy" element={<CartplusPrivacy />} />
          <Route path="/cartplus/terms" element={<CartplusTerms />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);