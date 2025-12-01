import React from 'react';

const SkillBar = ({ skill }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-gh-text font-medium text-sm">{skill.nombre}</span>
        <span className="text-gray-500 text-xs">{skill.categoria}</span>
      </div>
      <div className="w-full bg-gh-dark rounded-full h-2 overflow-hidden">
        <div
          className="bg-gh-accent h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${skill.nivel}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
