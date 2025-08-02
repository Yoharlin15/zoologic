import React from 'react';

const ChooseOptionView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Elige una de estas opciones</h2> 
        <img 
          src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1754091848/undraw_success-factors_i417_lpasnj.png" 
          alt="Opciones"
          className="mb-6 w-48 h-48 object-cover mx-auto"
          height={450}
        />
      </div>
    </div>
  );
};

export default ChooseOptionView;
