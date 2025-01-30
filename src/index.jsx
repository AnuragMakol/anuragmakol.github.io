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

// Error Page
import { Error404 } from './pages/error404';

const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* Error 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);