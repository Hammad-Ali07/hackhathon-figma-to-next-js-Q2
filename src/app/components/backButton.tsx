// File: components/BackButton.tsx

'use client';

import React from 'react';

const BackButton = () => {
  return (
    <button onClick={() => window.history.back()} className="ml-7 mt-6 bg-black text-white px-6 py-3 rounded-lg">Back To Shop</button>
  );
};

export default BackButton;