## Trabajo Práctico Integrador - Programación Visual - Grupo 7

# Integrantes

_Camacho Leandro Ezequiel - GitHub: @leandrocamacho02

_Miranda Facundo David - GitHub: @MirandaFD0

_Porco Lucas Ricardo - GitHub: @lucas777porco-ai

## Panel de Control de Clientes

Aplicación web desarrollada como proyecto final integrador de la asignatura Programación Visual de la Facultad de Ingeniería.

El objetivo principal del proyecto es implementar un sistema de administración de clientes con una arquitectura moderna basada en componentes, aplicando buenas prácticas de desarrollo frontend mediante React + Vite.

La aplicación permite gestionar el acceso de administradores, consultar información de clientes desde una API externa, realizar búsquedas, registrar nuevos usuarios y acceder a fichas detalladas con control de permisos.

# Tecnologías utilizadas

## Frontend

- React
- Vite
- JavaScript ES6+
- JSX
- React Router DOM
- Context API
- LocalStorage

## Interfaz y diseño

- Material UI / React Bootstrap
- Diseño responsive
- Componentes reutilizables

## Comunicación

- Fetch API
- Consumo de servicios REST
- Manejo de peticiones HTTP (GET, POST, DELETE)

# Características principales

## Sistema de autenticación

Implementación de un sistema de acceso para administradores utilizando:

- Context API para manejo del estado global.
- Persistencia de sesión mediante LocalStorage.
- Protección de rutas privadas.
- Cierre de sesión con limpieza del estado.

El sistema administra diferentes sectores:

- Soporte
- Gerencia

con permisos diferenciados dentro de la aplicación.

# Módulo de Gestión de Clientes

Permite consultar y administrar clientes mediante integración con una API externa.

Funcionalidades:

- Obtención de clientes mediante solicitudes HTTP.
- Visualización organizada en tabla.
- Información mostrada:

  - ID
  - Nombre completo
  - Email
  - Teléfono
  - Ciudad

- Buscador dinámico por apellido o ciudad.

- Manejo completo de estados:

  - Loading
  - Success
  - Error


# Módulo Alta de Clientes

Permite registrar nuevos clientes en el sistema.

Incluye:

- Formulario controlado con React.
- Validación de campos.
- Envío de información mediante método POST.
- Confirmación visual mediante alertas o notificaciones.

# Ficha detallada del Cliente

Cada cliente cuenta con una vista individual utilizando rutas dinámicas.

Implementa:

- React Router DOM.
- Parámetros dinámicos mediante `useParams`.
- Consulta individual a la API.
- Renderizado organizado de información personal.
- Visualización de datos relacionados.

# Gestión de permisos

El comportamiento de la aplicación cambia según el rol del administrador.

## Soporte

Permite:

- Consulta de información del cliente.

## Gerencia

Permite:

- Consulta completa.
- Acciones administrativas adicionales.

# API utilizada

Servicio externo utilizado para la gestión de usuarios:

https://fakestoreapi.com/users

# Instalación y ejecución

Instalar dependencias: npm install

Ejecutar servidor de desarrollo: npm run dev

# Control de versiones

El desarrollo fue gestionado mediante Git utilizando ramas para organizar funcionalidades y mantener un flujo de trabajo ordenado.

Repositorio: https://github.com/leandrocamacho02/pv_tp_integrador_grupo7

# Objetivo académico

Este proyecto integra los conocimientos adquiridos durante la cursada, aplicando conceptos de:

- Desarrollo basado en componentes.
- Manejo de estados globales.
- Navegación SPA.
- Consumo de APIs.
- Arquitectura modular.
- Diseño de interfaces modernas.