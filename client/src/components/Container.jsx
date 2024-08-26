import React from 'react';

function Container({ children }) {
  return (
    <body className='bg-gray-100'>
      <div className="flex items-center justify-center min-h-screen">
        <div class="container mx-auto p-4">
          {children}
        </div>
      </div>
    </body>
  );
}

export default Container;
