-- Crear base de datos
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- Tabla de estudios
CREATE TABLE IF NOT EXISTS estudios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    institucion VARCHAR(255) NOT NULL,
    periodo VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de skills
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nivel INT NOT NULL CHECK (nivel >= 0 AND nivel <= 100),
    categoria VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de experiencias
CREATE TABLE IF NOT EXISTS experiencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puesto VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    periodo VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    descripcion TEXT,
    actual BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de tecnologías de experiencias
CREATE TABLE IF NOT EXISTS experiencia_tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experiencia_id INT NOT NULL,
    tecnologia VARCHAR(50) NOT NULL,
    FOREIGN KEY (experiencia_id) REFERENCES experiencias(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de apps/proyectos
CREATE TABLE IF NOT EXISTS apps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    github VARCHAR(255),
    demo VARCHAR(255),
    destacado BOOLEAN DEFAULT FALSE,
    fecha_creacion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de tecnologías de apps
CREATE TABLE IF NOT EXISTS app_tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_id INT NOT NULL,
    tecnologia VARCHAR(50) NOT NULL,
    FOREIGN KEY (app_id) REFERENCES apps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo - Estudios
INSERT INTO estudios (titulo, institucion, periodo, fecha_inicio, fecha_fin, descripcion) VALUES
('Ingeniería en Sistemas Computacionales', 'Universidad Tecnológica', '2018 - 2022', '2018-01-01', '2022-12-01', 'Especialización en desarrollo web y bases de datos'),
('Certificación Full Stack Developer', 'Platzi', '2022', '2022-01-01', '2022-12-01', 'React, Node.js, MongoDB, PostgreSQL'),
('Curso Avanzado de React', 'Udemy', '2023', '2023-01-01', '2023-06-01', 'Hooks, Context API, Redux, Next.js');

-- Insertar datos de ejemplo - Skills
INSERT INTO skills (nombre, nivel, categoria) VALUES
('JavaScript', 95, 'Frontend'),
('React', 90, 'Frontend'),
('Tailwind CSS', 85, 'Frontend'),
('Node.js', 80, 'Backend'),
('MongoDB', 75, 'Database'),
('Git', 88, 'Tools'),
('Python', 70, 'Backend'),
('SQL', 82, 'Database');

-- Insertar datos de ejemplo - Experiencias
INSERT INTO experiencias (puesto, empresa, periodo, fecha_inicio, fecha_fin, descripcion, actual) VALUES
('Desarrollador Full Stack', 'Tech Solutions SA', '2023 - Presente', '2023-01-01', NULL, 'Desarrollo de aplicaciones web con React y Node.js. Implementación de APIs RESTful y gestión de bases de datos.', TRUE),
('Desarrollador Frontend', 'Digital Agency', '2022 - 2023', '2022-01-01', '2023-01-01', 'Creación de interfaces responsivas y optimizadas. Colaboración con equipo de diseño UX/UI.', FALSE),
('Desarrollador Junior', 'StartUp Innovation', '2021 - 2022', '2021-01-01', '2022-01-01', 'Mantenimiento y desarrollo de funcionalidades nuevas. Trabajo con metodologías ágiles.', FALSE);

-- Insertar tecnologías de experiencias
INSERT INTO experiencia_tecnologias (experiencia_id, tecnologia) VALUES
(1, 'React'), (1, 'Node.js'), (1, 'MongoDB'), (1, 'Tailwind CSS'),
(2, 'React'), (2, 'TypeScript'), (2, 'CSS3'), (2, 'Redux'),
(3, 'JavaScript'), (3, 'HTML5'), (3, 'CSS3'), (3, 'Bootstrap');

-- Insertar datos de ejemplo - Apps
INSERT INTO apps (nombre, descripcion, imagen, github, demo, destacado, fecha_creacion) VALUES
('E-Commerce Platform', 'Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración.', 
 'https://via.placeholder.com/400x300/58a6ff/FFFFFF?text=E-Commerce', 
 'https://github.com/tuusuario/ecommerce', 'https://demo-ecommerce.com', TRUE, '2024-01-01'),
('Task Manager Pro', 'Aplicación de gestión de tareas y proyectos con tableros Kanban, calendarios y colaboración en tiempo real.', 
 'https://via.placeholder.com/400x300/58a6ff/FFFFFF?text=Task+Manager', 
 'https://github.com/tuusuario/task-manager', 'https://taskmanager-demo.com', TRUE, '2024-02-01'),
('Weather Dashboard', 'Dashboard del clima con pronósticos extendidos, mapas interactivos y alertas meteorológicas.', 
 'https://via.placeholder.com/400x300/58a6ff/FFFFFF?text=Weather+App', 
 'https://github.com/tuusuario/weather-dashboard', 'https://weather-demo.com', FALSE, '2024-03-01'),
('Portfolio CMS', 'Sistema de gestión de contenidos para portfolios personales con editor visual y plantillas personalizables.', 
 'https://via.placeholder.com/400x300/58a6ff/FFFFFF?text=Portfolio+CMS', 
 'https://github.com/tuusuario/portfolio-cms', 'https://portfolio-cms-demo.com', FALSE, '2024-04-01'),
('Fitness Tracker', 'Aplicación de seguimiento de ejercicios y nutrición con estadísticas y gráficos de progreso.', 
 'https://via.placeholder.com/400x300/58a6ff/FFFFFF?text=Fitness+Tracker', 
 'https://github.com/tuusuario/fitness-tracker', NULL, FALSE, '2024-05-01');

-- Insertar tecnologías de apps
INSERT INTO app_tecnologias (app_id, tecnologia) VALUES
(1, 'React'), (1, 'Node.js'), (1, 'MongoDB'), (1, 'Stripe'),
(2, 'React'), (2, 'Firebase'), (2, 'Tailwind CSS'),
(3, 'React'), (3, 'OpenWeather API'), (3, 'Chart.js'),
(4, 'React'), (4, 'Next.js'), (4, 'PostgreSQL'), (4, 'Prisma'),
(5, 'React Native'), (5, 'Node.js'), (5, 'MySQL');
