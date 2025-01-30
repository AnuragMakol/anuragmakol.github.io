import React from 'react';
import { useNavigate } from 'react-router-dom';

import { WebsiteLayout } from '../components/layouts';

export function Error404(props) {
  const navigate = useNavigate();

  return (
    <WebsiteLayout props={props}>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Something's missing.</p>
          <p className="mb-10 text-lg font-light text-gray-500 ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <a onClick={() => navigate(-1)} className="rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">Go Back to Previous Page</a>
        </div>
      </div>
    </WebsiteLayout>
  )
}