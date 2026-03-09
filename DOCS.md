# OpenFAI - Open Fiber AI Network Management

## 🚀 Proyecto Refactorizado - Versión 2.0

Este proyecto ha sido completamente refactorizado para seguir las mejores prácticas de desarrollo y una arquitectura modular.

## 📁 Estructura del Proyecto

```
openfai/
├── config/                    # Archivos de configuración
│   └── settings.json         # Configuraciones de la aplicación
├── src/                      # Código fuente
│   ├── config/              # Configuración centralizada
│   │   └── index.js         # Exporta todas las configuraciones
│   ├── controllers/         # Controladores (lógica de rutas)
│   │   ├── auth.controller.js
│   │   ├── device.controller.js
│   │   ├── log.controller.js
│   │   ├── network.controller.js
│   │   ├── storage.controller.js
│   │   └── view.controller.js
│   ├── services/            # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── database.service.js
│   │   ├── device.service.js
│   │   ├── email.service.js
│   │   ├── log.service.js
│   │   ├── network.service.js
│   │   └── ssh.service.js
│   ├── routes/              # Definición de rutas
│   │   ├── api.routes.js
│   │   └── web.routes.js
│   └── server.js            # Configuración del servidor Express
├── public/                  # Archivos estáticos (CSS, JS, imágenes)
├── views/                   # Plantillas EJS
├── db/                      # Scripts de base de datos
├── .env                     # Variables de entorno (no incluir en git)
├── .env.example            # Ejemplo de variables de entorno
├── index.js                # Punto de entrada principal
└── package.json            # Dependencias y scripts

```

## 🎯 Mejoras Principales

### 1. **Arquitectura Modular**
- Separación clara entre controladores, servicios y rutas
- Código reutilizable y fácil de mantener
- Cada módulo tiene una responsabilidad específica

### 2. **Servicios Independientes**
- `database.service.js`: Manejo centralizado de la base de datos con pool de conexiones
- `auth.service.js`: Lógica de autenticación
- `email.service.js`: Envío de emails
- `device.service.js`: Gestión de dispositivos
- `log.service.js`: Sistema de logs
- `network.service.js`: Operaciones de red (ping, MAC lookup)
- `ssh.service.js`: Conexiones SSH a routers

### 3. **Mejor Manejo de Base de Datos**
- Uso de pool de conexiones
- Queries parametrizadas para prevenir SQL injection
- Métodos reutilizables para operaciones CRUD
- Promesas en lugar de callbacks

### 4. **Configuración Centralizada**
- Todas las configuraciones en `src/config/index.js`
- Variables de entorno con `.env`
- Fácil de cambiar sin tocar el código

### 5. **Rutas Organizadas**
- `api.routes.js`: Todas las rutas de API REST
- `web.routes.js`: Rutas de vistas/páginas
- Nombres de rutas más RESTful

### 6. **Mejores Prácticas**
- Manejo de errores consistente
- Logging mejorado
- Validación de datos de entrada
- Código más limpio y legible

## 🛠️ Instalación

```bash
# 1. Copiar el archivo de ejemplo de variables de entorno
cp .env.example .env

# 2. Editar .env con tus configuraciones
nano .env

# 3. Instalar dependencias
npm install

# 4. Crear la base de datos
mysql -u root -p < db/default-database.sql

# 5. Iniciar el servidor
npm start

# Para desarrollo con auto-reload:
npm run dev
```

## 🔐 Configuración de Base de Datos

Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=openfai
```

## 📧 Configuración de Email

Para recibir notificaciones por email, configura las variables SMTP en `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_aplicación
SMTP_FROM=noreply@openfai.com
```

## 📡 API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/hash` - Generar hash de contraseña

### Dispositivos
- `GET /api/devices` - Listar todos los dispositivos
- `GET /api/devices/:mac` - Obtener dispositivo por MAC
- `POST /api/storage/device` - Añadir nuevo dispositivo
- `PUT /api/devices/:mac` - Actualizar dispositivo
- `DELETE /api/devices/:mac` - Eliminar dispositivo

### Logs
- `GET /api/logs` - Listar todos los logs
- `GET /api/logs/risk/:risk` - Logs por nivel de riesgo
- `GET /api/logs/device/:device` - Logs por dispositivo
- `POST /api/storage/log` - Crear nuevo log
- `PUT /api/logs/:id/comments` - Actualizar comentarios
- `DELETE /api/logs/:id` - Eliminar log

### Red
- `GET /api/ping/:host` - Hacer ping a un host
- `GET /api/mac/:mac` - Obtener fabricante de MAC

### Storage (Base de datos genérica)
- `POST /api/storage` - Operaciones CRUD genéricas

## 🔍 Comparación con Versión Anterior

### Antes (v1)
```javascript
// Todo en server.js - 128 líneas monolíticas
const conection = mysql.createConnection({...}); // Nueva conexión cada vez
webserver.post('/login', (req, res) => {
  // Lógica de autenticación mezclada con SQL
  conection.query(query, ['admin'], (error, rows) => {
    // Callbacks anidados
  });
});
```

### Ahora (v2)
```javascript
// Servicio separado y reutilizable
const authService = require('../services/auth.service');

// Controlador limpio
async login(req, res) {
  const result = await authService.verifyCredentials(username, password);
  return res.json(result);
}

// Pool de conexiones reutilizable en el servicio
async verifyCredentials(username, password) {
  const user = await databaseService.findOne('userdata', 'username', username);
  // Lógica clara y sin callbacks
}
```

## 🎨 Características

- ✅ Arquitectura MVC modular
- ✅ Pool de conexiones a base de datos
- ✅ Manejo de errores robusto
- ✅ Logging mejorado
- ✅ Validación de datos
- ✅ Código reutilizable
- ✅ Fácil de testear
- ✅ Fácil de escalar
- ✅ Configuración centralizada
- ✅ Código autodocumentado

## 📝 Próximos Pasos Recomendados

1. **Agregar Tests**
   - Unit tests para servicios
   - Integration tests para API
   
2. **Middleware de Autenticación**
   - JWT tokens
   - Proteger rutas sensibles

3. **Validación de Inputs**
   - Usar librería como `joi` o `express-validator`

4. **Rate Limiting**
   - Proteger contra ataques de fuerza bruta

5. **Logging Profesional**
   - Implementar `winston` o `pino`

6. **Documentation**
   - Swagger/OpenAPI para documentar API

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:
1. Seguir la estructura modular existente
2. Documentar el código
3. Añadir tests si es posible

## 📄 Licencia

MIT License - Ver LICENSE para más detalles

---

**Desarrollado con ❤️ por el equipo OpenFAI**
