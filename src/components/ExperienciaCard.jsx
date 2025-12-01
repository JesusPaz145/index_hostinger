import React from 'react';

const ExperienciaCard = ({ experiencia }) => {
  return (
    <div className="bg-gh-gray border border-gh-border rounded-lg p-4 hover:border-gh-accent transition-all duration-200">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gh-accent mb-1">{experiencia.puesto}</h3>
        <p className="text-gh-text font-medium text-sm">{experiencia.empresa}</p>
        <p className="text-gray-500 text-xs mt-1">{experiencia.periodo}</p>
      </div>
      
      <p className="text-gray-400 text-xs leading-relaxed mb-3">
        {experiencia.descripcion}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {experiencia.tecnologias.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-gh-dark border border-gh-border text-gh-accent text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienciaCard;
