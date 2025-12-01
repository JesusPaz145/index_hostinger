import React, { useState } from 'react';

const AdminPanel = ({ estudios, skills, experiencias, apps, onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState('estudios');
  const [data, setData] = useState({
    estudios,
    skills,
    experiencias,
    apps
  });
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    // Guardar en localStorage
    localStorage.setItem('portfolio_estudios', JSON.stringify(data.estudios));
    localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
    localStorage.setItem('portfolio_experiencias', JSON.stringify(data.experiencias));
    localStorage.setItem('portfolio_apps', JSON.stringify(data.apps));
    
    onSave(data);
    alert('Datos guardados correctamente!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'portfolio-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDelete = (type, id) => {
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      setData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
  };

  const handleAdd = () => {
    const newItem = getEmptyItem(activeTab);
    setEditingItem(newItem);
    setIsAdding(true);
  };

  const getEmptyItem = (type) => {
    const maxId = data[type].length > 0 ? Math.max(...data[type].map(i => i.id)) : 0;
    const templates = {
      estudios: { id: maxId + 1, titulo: '', institucion: '', periodo: '', descripcion: '' },
      skills: { id: maxId + 1, nombre: '', nivel: 50, categoria: '' },
      experiencias: { id: maxId + 1, puesto: '', empresa: '', periodo: '', descripcion: '', tecnologias: [] },
      apps: { id: maxId + 1, nombre: '', descripcion: '', imagen: '', github: '', demo: '', destacado: false, tecnologias: [] }
    };
    return templates[type];
  };

  const handleSaveItem = (item) => {
    if (isAdding) {
      setData(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], item]
      }));
    } else {
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(i => i.id === item.id ? item : i)
      }));
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gh-dark text-gh-text p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gh-accent">Panel de Administración</h1>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="bg-gh-gray border border-gh-border text-gh-text px-4 py-2 rounded-lg hover:border-gh-accent transition-all"
            >
              ← Volver
            </button>
            <button
              onClick={handleExport}
              className="bg-gh-gray border border-gh-border text-gh-text px-4 py-2 rounded-lg hover:border-gh-accent transition-all"
            >
              📥 Exportar JSON
            </button>
            <button
              onClick={handleSave}
              className="bg-gh-accent text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
              💾 Guardar Cambios
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gh-border">
          {['estudios', 'skills', 'experiencias', 'apps'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-gh-accent border-b-2 border-gh-accent'
                  : 'text-gray-500 hover:text-gh-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="mb-4 bg-gh-gray border border-gh-border text-gh-accent px-4 py-2 rounded-lg hover:border-gh-accent transition-all"
        >
          ➕ Agregar {activeTab.slice(0, -1)}
        </button>

        {/* List */}
        <div className="grid gap-4">
          {data[activeTab].map(item => (
            <ItemCard
              key={item.id}
              item={item}
              type={activeTab}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(activeTab, item.id)}
            />
          ))}
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <EditModal
            item={editingItem}
            type={activeTab}
            onSave={handleSaveItem}
            onClose={() => {
              setEditingItem(null);
              setIsAdding(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ItemCard = ({ item, type, onEdit, onDelete }) => {
  const getTitle = () => {
    switch(type) {
      case 'estudios': return item.titulo;
      case 'skills': return item.nombre;
      case 'experiencias': return item.puesto;
      case 'apps': return item.nombre;
      default: return '';
    }
  };

  const getSubtitle = () => {
    switch(type) {
      case 'estudios': return item.institucion;
      case 'skills': return `${item.nivel}% - ${item.categoria}`;
      case 'experiencias': return item.empresa;
      case 'apps': return item.descripcion?.substring(0, 50) + '...';
      default: return '';
    }
  };

  return (
    <div className="bg-gh-gray border border-gh-border rounded-lg p-4 flex justify-between items-center hover:border-gh-accent transition-all">
      <div>
        <h3 className="text-lg font-semibold text-gh-text">{getTitle()}</h3>
        <p className="text-gray-500 text-sm">{getSubtitle()}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="bg-gh-dark border border-gh-border text-gh-accent px-3 py-1 rounded hover:border-gh-accent transition-all"
        >
          ✏️ Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-gh-dark border border-gh-border text-red-400 px-3 py-1 rounded hover:border-red-400 transition-all"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

const EditModal = ({ item, type, onSave, onClose }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(v => v.trim()).filter(v => v);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderFields = () => {
    switch(type) {
      case 'estudios':
        return (
          <>
            <Input label="Título" value={formData.titulo} onChange={(v) => handleChange('titulo', v)} />
            <Input label="Institución" value={formData.institucion} onChange={(v) => handleChange('institucion', v)} />
            <Input label="Periodo" value={formData.periodo} onChange={(v) => handleChange('periodo', v)} />
            <TextArea label="Descripción" value={formData.descripcion} onChange={(v) => handleChange('descripcion', v)} />
          </>
        );
      case 'skills':
        return (
          <>
            <Input label="Nombre" value={formData.nombre} onChange={(v) => handleChange('nombre', v)} />
            <Input label="Nivel (0-100)" type="number" value={formData.nivel} onChange={(v) => handleChange('nivel', parseInt(v))} />
            <Input label="Categoría" value={formData.categoria} onChange={(v) => handleChange('categoria', v)} />
          </>
        );
      case 'experiencias':
        return (
          <>
            <Input label="Puesto" value={formData.puesto} onChange={(v) => handleChange('puesto', v)} />
            <Input label="Empresa" value={formData.empresa} onChange={(v) => handleChange('empresa', v)} />
            <Input label="Periodo" value={formData.periodo} onChange={(v) => handleChange('periodo', v)} />
            <TextArea label="Descripción" value={formData.descripcion} onChange={(v) => handleChange('descripcion', v)} />
            <Input label="Tecnologías (separadas por coma)" value={formData.tecnologias?.join(', ')} onChange={(v) => handleArrayChange('tecnologias', v)} />
          </>
        );
      case 'apps':
        return (
          <>
            <Input label="Nombre" value={formData.nombre} onChange={(v) => handleChange('nombre', v)} />
            <TextArea label="Descripción" value={formData.descripcion} onChange={(v) => handleChange('descripcion', v)} />
            <Input label="URL Imagen" value={formData.imagen} onChange={(v) => handleChange('imagen', v)} />
            <Input label="GitHub URL" value={formData.github} onChange={(v) => handleChange('github', v)} />
            <Input label="Demo URL" value={formData.demo} onChange={(v) => handleChange('demo', v)} />
            <Input label="Tecnologías (separadas por coma)" value={formData.tecnologias?.join(', ')} onChange={(v) => handleArrayChange('tecnologias', v)} />
            <label className="flex items-center gap-2 text-gh-text">
              <input
                type="checkbox"
                checked={formData.destacado}
                onChange={(e) => handleChange('destacado', e.target.checked)}
                className="w-4 h-4"
              />
              Destacado
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gh-gray border border-gh-border rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gh-accent mb-4">
          {item.id && !item.titulo && !item.nombre && !item.puesto ? 'Agregar' : 'Editar'} {type.slice(0, -1)}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFields()}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gh-accent text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
              💾 Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gh-dark border border-gh-border text-gh-text px-4 py-2 rounded-lg hover:border-gh-accent transition-all"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-gh-text text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gh-dark border border-gh-border text-gh-text px-3 py-2 rounded-lg focus:border-gh-accent focus:outline-none"
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gh-text text-sm font-medium mb-1">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full bg-gh-dark border border-gh-border text-gh-text px-3 py-2 rounded-lg focus:border-gh-accent focus:outline-none"
    />
  </div>
);

export default AdminPanel;
