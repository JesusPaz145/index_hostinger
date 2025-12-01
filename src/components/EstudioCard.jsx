import React from 'react';

const EstudioCard = ({ estudio }) => {
  return (
    <div className="bg-gh-gray border border-gh-border rounded-lg p-4 hover:border-gh-accent transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gh-accent">{estudio.titulo}</h3>
      </div>
      <p className="text-gh-text font-medium mb-1 text-sm">{estudio.institucion}</p>
      <p className="text-gray-500 text-xs mb-2">{estudio.periodo}</p>
      <p className="text-gray-400 text-xs leading-relaxed">{estudio.descripcion}</p>
    </div>
  );
};

export default EstudioCard;
