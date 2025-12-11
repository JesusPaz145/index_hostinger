# Portafolio (estático) - convertido a HTML/CSS/JS + PHP

He convertido este repositorio a una versión simple basada en HTML, CSS y JavaScript en el frontend
con endpoints PHP del lado del servidor que sirven los datos JSON existentes en `data/`.

## 🚀 Características

- ✅ Dashboard de 3 columnas
- ✅ Datos dinámicos desde archivos JSON
- ✅ Diseño responsive
- ✅ Colores personalizados (Negro y Rojo)
- ✅ Animaciones y efectos hover
- ✅ Listo para desplegar en Hostinger

## Cómo ejecutar (con PHP)

Puedes ejecutar esta versión con el servidor PHP embebido (requiere PHP instalado):

```powershell
cd c:\www\GitHub\guarderia_py\TransitPro\index_hostinger
php -S localhost:8000 -t .
```

Después abre `http://localhost:8000` en tu navegador. Los endpoints están en `./api/*.php` y leen los JSON en `./data/`.

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

## Estructura minimizada

- `index.html` — página principal (frontend estático)
- `assets/` — `style.css` y `script.js`
- `api/` — endpoints PHP: `apps.php`, `estudios.php`, `experiencias.php`, `skills.php`, `contact.php`
- `data/` — archivos JSON con tus datos (se consumen desde `api/`)

Los archivos React/Tailwind/Vite se han dejado sólo como referencia en `src/` pero ya no son necesarios.

## Personalización rápida

1. Edita los JSON en `data/` para actualizar tus estudios, habilidades, experiencias y proyectos.
2. Edita `index.html`, `assets/style.css` o `assets/script.js` para cambiar diseño o comportamiento.

Contacto: el formulario envía a `api/contact.php` y guarda mensajes en `api/messages.txt`.

---
Si quieres, puedo:
- eliminar completamente los archivos de React/Node (package.json, src/, configs)
- mejorar el diseño de `index.html` o añadir más secciones

Dime si quieres que borre los archivos antiguos o que haga más ajustes.
