import React, { useState, useEffect } from 'react';
import EstudioCard from './components/EstudioCard';
import SkillBar from './components/SkillBar';
import ExperienciaCard from './components/ExperienciaCard';
import AppCard from './components/AppCard';
import AdminPanel from './components/AdminPanel';

// Importar datos JSON como fallback
import estudiosData from './data/estudios.json';
import skillsData from './data/skills.json';
import experienciasData from './data/experiencias.json';
import appsData from './data/apps.json';

// Cambiar la URL base según el entorno
const API_URL = import.meta.env.PROD 
  ? 'https://tudominio.com/api' 
  : 'http://localhost/index_hostinger/api';

const USE_API = import.meta.env.VITE_USE_API === 'true';

function App() {
  const [estudios, setEstudios] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (USE_API) {
        // Intentar cargar desde API
        try {
          const [estudiosRes, skillsRes, experienciasRes, appsRes] = await Promise.all([
            fetch(`${API_URL}/estudios.php`),
            fetch(`${API_URL}/skills.php`),
            fetch(`${API_URL}/experiencias.php`),
            fetch(`${API_URL}/apps.php`)
          ]);

          setEstudios(await estudiosRes.json());
          setSkills(await skillsRes.json());
          setExperiencias(await experienciasRes.json());
          setApps(await appsRes.json());
        } catch (error) {
          console.warn('API no disponible, usando datos JSON locales');
          // Fallback a JSON o localStorage
          loadLocalData();
        }
      } else {
        // Usar datos locales (JSON o localStorage)
        loadLocalData();
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadLocalData = () => {
    // Intentar cargar desde localStorage primero
    const savedEstudios = localStorage.getItem('portfolio_estudios');
    const savedSkills = localStorage.getItem('portfolio_skills');
    const savedExperiencias = localStorage.getItem('portfolio_experiencias');
    const savedApps = localStorage.getItem('portfolio_apps');

    console.log('Cargando desde localStorage:', {
      estudios: savedEstudios ? JSON.parse(savedEstudios) : estudiosData,
      skills: savedSkills ? JSON.parse(savedSkills) : skillsData,
      experiencias: savedExperiencias ? JSON.parse(savedExperiencias) : experienciasData,
      apps: savedApps ? JSON.parse(savedApps) : appsData
    });

    setEstudios(savedEstudios ? JSON.parse(savedEstudios) : estudiosData);
    setSkills(savedSkills ? JSON.parse(savedSkills) : skillsData);
    setExperiencias(savedExperiencias ? JSON.parse(savedExperiencias) : experienciasData);
    setApps(savedApps ? JSON.parse(savedApps) : appsData);
  };

  const handleSaveData = (newData) => {
    console.log('Guardando datos:', newData);
    
    // Guardar en localStorage
    localStorage.setItem('portfolio_estudios', JSON.stringify(newData.estudios));
    localStorage.setItem('portfolio_skills', JSON.stringify(newData.skills));
    localStorage.setItem('portfolio_experiencias', JSON.stringify(newData.experiencias));
    localStorage.setItem('portfolio_apps', JSON.stringify(newData.apps));
    
    // Actualizar estados inmediatamente
    setEstudios([...newData.estudios]);
    setSkills([...newData.skills]);
    setExperiencias([...newData.experiencias]);
    setApps([...newData.apps]);
    
    // Cerrar panel admin
    setShowAdmin(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gh-dark flex items-center justify-center">
        <div className="text-gh-accent text-xl">Cargando...</div>
      </div>
    );
  }

  // Mostrar panel de admin
  if (showAdmin) {
    return (
      <AdminPanel
        estudios={estudios}
        skills={skills}
        experiencias={experiencias}
        apps={apps}
        onSave={handleSaveData}
        onClose={() => setShowAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gh-dark text-gh-text">
      {/* Header */}
      <header className="bg-gh-gray border-b border-gh-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-10 h-10 object-contain rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold text-gh-text">
                  Mi <span className="text-gh-accent">Portfolio</span>
                </h1>
                <p className="text-gray-500 text-xs">Full Stack Developer</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 items-center">
              <a href="#estudios" className="text-gh-text hover:text-gh-accent transition-colors text-sm font-medium">
                Educación
              </a>
              <a href="#experiencias" className="text-gh-text hover:text-gh-accent transition-colors text-sm font-medium">
                Experiencia
              </a>
              <a href="#apps" className="text-gh-text hover:text-gh-accent transition-colors text-sm font-medium">
                Proyectos
              </a>
              <button
                onClick={() => setShowAdmin(true)}
                className="bg-gh-accent text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition-all text-sm font-medium"
                title="Panel de Administración"
              >
                ⚙️ Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Dashboard */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Columna 1: Estudios y Skills */}
          <div id="estudios" className="space-y-4">
            {/* Estudios */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gh-text">
                <span className="text-gh-accent">📚</span>
                Educación
              </h2>
              <div className="space-y-3">
                {estudios.map((estudio) => (
                  <EstudioCard key={estudio.id} estudio={estudio} />
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gh-text">
                <span className="text-gh-accent">⚡</span>
                Skills
              </h2>
              <div className="bg-gh-gray border border-gh-border rounded-lg p-4">
                {skills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </section>
          </div>

          {/* Columna 2: Experiencias */}
          <div id="experiencias">
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gh-text">
                <span className="text-gh-accent">💼</span>
                Experiencia Laboral
              </h2>
              <div className="space-y-3">
                {experiencias.map((experiencia) => (
                  <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
                ))}
              </div>
            </section>
          </div>

          {/* Columna 3: Apps/Proyectos */}
          <div id="apps">
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gh-text">
                <span className="text-gh-accent">🚀</span>
                Mis Proyectos
              </h2>
              <div className="space-y-4">
                {apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gh-gray border-t border-gh-border mt-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Portfolio. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gh-accent transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gh-accent transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:tu@email.com"
                className="text-gray-500 hover:text-gh-accent transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
