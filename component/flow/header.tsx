import React from "react";

interface HeaderProps {
  onSave: () => void;
  errorMessage: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, errorMessage }) => {
  return (
    <>
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Chatbot Flow Builder
        </h1>
        <button
          onClick={onSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default Header;
