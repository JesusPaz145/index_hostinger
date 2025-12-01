import React from 'react';

const AppCard = ({ app }) => {
  return (
    <div className="bg-gh-gray border border-gh-border rounded-lg overflow-hidden hover:border-gh-accent transition-all duration-200">
      {/* Imagen */}
      <div className="relative h-32 bg-gh-dark border-b border-gh-border">
        <img
          src={app.imagen}
          alt={app.nombre}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
        />
        {app.destacado && (
          <span className="absolute top-2 right-2 bg-gh-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
            ⭐ Destacado
          </span>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gh-accent mb-2">{app.nombre}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3">
          {app.descripcion}
        </p>
        
        {/* Tecnologías */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {app.tecnologias.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gh-dark border border-gh-border text-gray-400 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex gap-2">
          {app.github && (
            <a
              href={app.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gh-dark border border-gh-border text-gh-text py-1.5 rounded-md text-center hover:border-gh-accent hover:text-gh-accent transition-all font-medium text-xs"
            >
              GitHub
            </a>
          )}
          {app.demo && (
            <a
              href={app.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gh-accent text-gh-dark py-1.5 rounded-md text-center hover:bg-blue-500 transition-all font-medium text-xs"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppCard;
