# Películas — Diario de cine

Proyecto personal y educativo desarrollado con Angular, inspirado en
Letterboxd. Permite explorar un catálogo de ejemplo, puntuar películas
y organizar un diario de cine personal.

## Funcionalidades

- Búsqueda por título, director y género.
- Filtros por estado, género y década.
- Ordenación por título, año, nota media, votos y puntuación personal.
- Puntuaciones de 0,5 a 5 estrellas.
- Películas vistas, pendientes y favoritas.
- Reseñas personales y fecha de visualización.
- Diario agrupado por meses y estadísticas personales.
- Listas personalizadas con edición y ordenación mediante arrastrar y soltar.
- Persistencia en el navegador mediante localStorage.
- Exportación e importación de copias de seguridad en JSON.
- Restablecimiento de los datos personales desde ajustes.

## Tecnologías

Angular 21, TypeScript, Angular Router, Angular CDK y CSS.
Pruebas unitarias con Vitest.

## Capturas

### Catálogo
![Catálogo con filtros y puntuaciones](docs/screenshots/catalogo.png)

### Detalle de película
![Detalle con puntuación y reseña personal](docs/screenshots/detalle.png)

### Listas personalizadas
![Lista personalizada de películas](docs/screenshots/listas.png)

## Arquitectura

El proyecto está organizado por funcionalidades y responsabilidades:

```text
src/app/
  core/
    data/          Catálogo de ejemplo
    models/        Interfaces y tipos
    services/      Estado de películas, listas y persistencia
    utils/         Filtros, ordenación, validadores y pruebas
  features/
    movies/
      components/  Componentes específicos de películas
      pages/       Catálogo, detalle, diario, estadísticas, listas y ajustes
  shared/
    components/    Cabecera, puntuación, estados e indicadores reutilizables
```

Los componentes standalone conectan las plantillas con el estado mediante
signals y computed. Los servicios gestionan los datos compartidos y los
helpers contienen funciones independientes para filtrar, ordenar y validar.

## Ejecución local

Requisitos: Node.js 22.12 o superior dentro de la rama 22.x y npm.

Clona el repositorio y abre una terminal en la carpeta que contiene
`package.json`. Instala las dependencias y arranca la aplicación:

```bash
npm ci
npm start
```

Abre http://localhost:4200/ en el navegador.

## Pruebas

Para ejecutar las pruebas de los helpers:

```bash
npm test -- --watch=false --include="src/app/core/utils/*.spec.ts"
```

Incluyen 33 casos de ordenación, filtros y validación de datos personales
y listas.

## Compilación

```bash
npm run build
```

Genera la aplicación en `dist/`. Este comando no publica el proyecto.

## Datos y limitaciones

El catálogo utiliza datos de ejemplo definidos en `movies.mock.ts`.
No existe conexión con una API de películas, backend ni autenticación.

Los datos personales se guardan en localStorage y dependen del navegador
y del origen desde el que se abre la aplicación. No se sincronizan entre
dispositivos y pueden perderse al borrar los datos del navegador.

Desde ajustes se puede exportar un backup JSON y restaurarlo posteriormente.
La importación sustituye los datos personales y las listas actuales tras
pedir confirmación.

## Objetivo educativo

Practicar componentes reutilizables, comunicación entre padre e hijo,
inyección de dependencias, estado reactivo, navegación, persistencia local
y pruebas unitarias en Angular.
