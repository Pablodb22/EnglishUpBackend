# 🎓 EnglishUp

Una plataforma interactiva de aprendizaje de inglés que combina inteligencia artificial con ejercicios prácticos para mejorar tus habilidades gramaticales y de vocabulario.

![EnglishUp](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![NestJS](https://img.shields.io/badge/NestJS-10-red)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## 🌐 Demo

**Aplicación en vivo:** [https://english-up-gamma.vercel.app/](https://english-up-gamma.vercel.app/)

## 📦 Repositorios

- **Frontend:** [https://github.com/Pablodb22/EnglishUpFrontend](https://github.com/Pablodb22/EnglishUpFrontend)
- **Backend:** [https://github.com/Pablodb22/EnglishUpBackend](https://github.com/Pablodb22/EnglishUpBackend)

## ✨ Características principales

### 🔐 Gestión de usuarios
- Sistema completo de registro y autenticación
- Perfil de usuario editable
- Gestión de datos personales

### 📊 Evaluación de nivel
- Prueba de nivel inicial para determinar tu punto de partida
- Clasificación automática según tus conocimientos

### 📚 Módulo de gramática
- Ejercicios organizados por niveles de dificultad
- Tests dinámicos generados con Google AI API
- Preguntas únicas en cada sesión para evitar memorización
- Práctica adaptada a tu nivel actual

### 💬 Módulo de vocabulario
- Vocabulario organizado por temas específicos
- Palabras generadas dinámicamente mediante IA
- Pronunciación de palabras con Web Speech API
- Audio en tiempo real para mejorar la pronunciación

## 🛠️ Stack tecnológico

### Frontend
- **Framework:** Next.js 14
- **Estilos:** Bootstrap 5
- **Audio:** Web Speech API (SpeechSynthesis)
- **Despliegue:** Vercel

### Backend
- **Framework:** NestJS
- **Base de datos:** Supabase (PostgreSQL)
- **Despliegue:** Railway
- **IA:** Google AI API (Gemini)

## 🚀 Arquitectura

```
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│  Next.js        │────────▶│   NestJS        │
│  (Vercel)       │         │   (Railway)     │
│                 │         │                 │
└─────────────────┘         └────────┬────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│  Web Speech API │         │    Supabase     │
│  (Browser)      │         │   (Database)    │
└─────────────────┘         └────────┬────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │  Google AI API  │
                            │    (Gemini)     │
                            └─────────────────┘
```

## 📋 Funcionalidades detalladas

### Sistema de IA integrado
La aplicación utiliza Google AI API para:
- Generar preguntas de gramática únicas y contextualizadas
- Crear listas de vocabulario dinámicas y variadas
- Adaptar el contenido según el nivel del usuario
- Evitar la repetición de ejercicios

### Sistema de audio
Implementación de Web Speech API para:
- Pronunciación automática de palabras de vocabulario
- Mejora de la comprensión auditiva
- Aprendizaje de la fonética correcta del inglés

## 🎯 Flujo de usuario

1. **Registro/Login** → Crear cuenta o iniciar sesión
2. **Prueba de nivel** → Realizar test inicial para determinar nivel
3. **Selección de módulo** → Elegir entre Gramática o Vocabulario
4. **Práctica** → Realizar ejercicios adaptados a tu nivel
5. **Progreso** → Seguimiento de tu evolución

## 🔧 Instalación local

### Prerequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Supabase
- API Key de Google AI

### Frontend
```bash
git clone https://github.com/Pablodb22/EnglishUpFrontend
cd EnglishUpFrontend
npm install
npm run dev
```

### Backend
```bash
git clone https://github.com/Pablodb22/EnglishUpBackend
cd EnglishUpBackend
npm install
npm run start:dev
```

### Variables de entorno

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=tu_url_backend
```

**Backend (.env)**
```env
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key
GOOGLE_AI_API_KEY=tu_google_ai_key
```

## 🌟 Ventajas de la plataforma

- ✅ Contenido siempre fresco y dinámico
- ✅ Aprendizaje adaptativo según tu nivel
- ✅ Práctica de pronunciación integrada
- ✅ Interfaz intuitiva y responsive
- ✅ Progreso personalizado

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Pablo**
- GitHub Frontend: [@Pablodb22](https://github.com/Pablodb22/EnglishUpFrontend)
- GitHub Backend: [@Pablodb22](https://github.com/Pablodb22/EnglishUpBackend)

## 🙏 Agradecimientos

- Google AI por su potente API de generación de contenido
- Supabase por la infraestructura de base de datos
- Vercel y Railway por el hosting gratuito
- La comunidad de Next.js y NestJS

---

⭐ Si te ha gustado el proyecto, no olvides darle una estrella en GitHub!