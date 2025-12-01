# Portfolio Personal - JP

Portfolio personal desarrollado con React, Vite y Tailwind CSS con diseño en negro y rojo.

## 🚀 Características

- ✅ Dashboard de 3 columnas
- ✅ Datos dinámicos desde archivos JSON
- ✅ Diseño responsive
- ✅ Colores personalizados (Negro y Rojo)
- ✅ Animaciones y efectos hover
- ✅ Listo para desplegar en Hostinger

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

## 🛠️ Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build para Producción

Para crear el build optimizado para Hostinger:
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

## 📤 Despliegue en Hostinger

1. Ejecuta `npm run build`
2. Sube el contenido de la carpeta `dist/` a tu hosting de Hostinger
3. Asegúrate de que el directorio apunte a la raíz donde subiste los archivos

### Método File Manager:
- Accede al File Manager de Hostinger
- Navega a `public_html` (o tu directorio web)
- Sube todos los archivos de la carpeta `dist/`

### Método FTP:
- Conecta vía FTP a tu hosting
- Sube los archivos de `dist/` a `public_html/`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── EstudioCard.jsx
│   ├── SkillBar.jsx
│   ├── ExperienciaCard.jsx
│   └── AppCard.jsx
├── data/               # Archivos JSON (base de datos)
│   ├── estudios.json
│   ├── skills.json
│   ├── experiencias.json
│   └── apps.json
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎨 Personalización

### Datos
Edita los archivos JSON en `src/data/` para actualizar tu información:
- `estudios.json` - Tu educación
- `skills.json` - Tus habilidades técnicas
- `experiencias.json` - Tu experiencia laboral
- `apps.json` - Tus proyectos

### Colores
Los colores están definidos en `tailwind.config.js`:
- `jp-red`: #E63946 (Rojo principal)
- `jp-dark`: #0A0A0A (Negro oscuro)
- `jp-gray`: #1A1A1A (Gris oscuro)

## 📝 Tecnologías

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS + Autoprefixer

## 📄 Licencia

Proyecto personal - Libre de usar y modificar
