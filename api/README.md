# Backend PHP para Portfolio

API REST desarrollada en PHP con MySQL para el portfolio personal.

## 📁 Estructura

```
api/
├── config/
│   └── database.php      # Configuración de conexión a BD
├── estudios.php          # Endpoint de estudios
├── skills.php            # Endpoint de skills
├── experiencias.php      # Endpoint de experiencias
├── apps.php              # Endpoint de proyectos
└── database.sql          # Script SQL para crear BD
```

## 🚀 Instalación Local

### 1. Configurar XAMPP/WAMP/MAMP
- Inicia Apache y MySQL
- Accede a phpMyAdmin (http://localhost/phpmyadmin)

### 2. Crear Base de Datos
```sql
-- Importa el archivo database.sql en phpMyAdmin
-- O ejecuta desde terminal:
mysql -u root -p < api/database.sql
```

### 3. Configurar Conexión
Edita `api/config/database.php`:
```php
private $host = "localhost";
private $db_name = "portfolio_db";
private $username = "root";
private $password = ""; // Tu contraseña de MySQL
```

### 4. Colocar archivos API
Copia la carpeta `api` a tu directorio web:
- XAMPP: `C:/xampp/htdocs/index_hostinger/api/`
- WAMP: `C:/wamp64/www/index_hostinger/api/`

### 5. Probar API
Abre en el navegador:
- http://localhost/index_hostinger/api/estudios.php
- http://localhost/index_hostinger/api/skills.php
- http://localhost/index_hostinger/api/experiencias.php
- http://localhost/index_hostinger/api/apps.php

## 🌐 Despliegue en Hostinger

### 1. Crear Base de Datos en Hostinger
1. Accede al panel de Hostinger
2. Ve a "Bases de datos MySQL"
3. Crea una nueva base de datos
4. Anota: nombre de BD, usuario y contraseña

### 2. Importar Base de Datos
1. Accede a phpMyAdmin desde Hostinger
2. Selecciona tu base de datos
3. Importa `database.sql`

### 3. Configurar Conexión
Edita `api/config/database.php` con los datos de Hostinger:
```php
private $host = "localhost"; // O el host que te dé Hostinger
private $db_name = "u123456_portfolio"; // Tu BD
private $username = "u123456_user"; // Tu usuario
private $password = "tu_contraseña_segura";
```

### 4. Subir Archivos
Via File Manager o FTP:
```
public_html/
├── api/
│   ├── config/
│   │   └── database.php
│   ├── estudios.php
│   ├── skills.php
│   ├── experiencias.php
│   └── apps.php
├── index.html
├── assets/
└── logo.png
```

### 5. Actualizar URL en React
Edita `src/App.jsx`:
```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://tudominio.com/api'  // Tu dominio real
  : 'http://localhost/index_hostinger/api';
```

### 6. Build y Deploy
```bash
npm run build
# Sube el contenido de dist/ a public_html/
```

## 📊 Estructura de Base de Datos

### Tabla: estudios
- id (INT, PK)
- titulo (VARCHAR)
- institucion (VARCHAR)
- periodo (VARCHAR)
- descripcion (TEXT)

### Tabla: skills
- id (INT, PK)
- nombre (VARCHAR)
- nivel (INT 0-100)
- categoria (VARCHAR)

### Tabla: experiencias
- id (INT, PK)
- puesto (VARCHAR)
- empresa (VARCHAR)
- periodo (VARCHAR)
- descripcion (TEXT)
- actual (BOOLEAN)

### Tabla: apps
- id (INT, PK)
- nombre (VARCHAR)
- descripcion (TEXT)
- imagen (VARCHAR)
- github (VARCHAR)
- demo (VARCHAR)
- destacado (BOOLEAN)

## 🔧 Mantenimiento

### Agregar un nuevo estudio
```sql
INSERT INTO estudios (titulo, institucion, periodo, descripcion) 
VALUES ('Nuevo Curso', 'Plataforma', '2025', 'Descripción del curso');
```

### Agregar una nueva app
```sql
INSERT INTO apps (nombre, descripcion, imagen, github, demo, destacado) 
VALUES ('Mi App', 'Descripción', 'url-imagen', 'url-github', 'url-demo', TRUE);

-- Agregar tecnologías
INSERT INTO app_tecnologias (app_id, tecnologia) 
VALUES (LAST_INSERT_ID(), 'React'), (LAST_INSERT_ID(), 'Node.js');
```

## 🔒 Seguridad

Para producción:
1. Cambia las credenciales de BD
2. Usa contraseñas fuertes
3. Limita CORS a tu dominio específico
4. Considera implementar rate limiting
5. Valida y sanitiza inputs si agregas POST/PUT

## 📝 Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/estudios.php` | GET | Lista de estudios |
| `/api/skills.php` | GET | Lista de skills |
| `/api/experiencias.php` | GET | Lista de experiencias |
| `/api/apps.php` | GET | Lista de proyectos |
