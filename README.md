# Forme-app

Esta aplicación es una plataforma web que permite a las personas conectarse para realizar trabajos sencillos y ser remuneradas según su profesión.

Está construida a partir del stack PERN (PostgreSQL, Express, React, Node.js). Tiene una arquitectura tipo API REST, en la que el frontend se comunica con el backend mediante peticiones HTTP, y el backend se conecta a una base de datos alojada en la nube.

# Diseño del sistema DevOps

![Commit](https://github.com/cricamore/forme-app/assets/64567005/8f13244c-61c3-4b6c-81a2-8a41099f56bb)

El pipeline CI/CD que se maneja en la aplicación se realiza mediante GitHub Actions. Establecimos un archivo .yaml que ejecuta una serie de tareas cada vez que se realiza un push a la rama main. Al ocurrir este evento, se ejecutan una serie de tareas en un entorno virtual de Linux. Se clona el repositorio y se instalan todas las dependencias necesarias para la ejecución del proyecto. Una vez que esto sucede, se ejecutan pruebas unitarias, de integración y funcionales para validar el correcto funcionamiento de la aplicación. Solo si estas pruebas pasan, se despliega la aplicación frontend en el servicio de Vercel y el backend en el servicio de Railway. En caso de que una prueba falle, no se desplegarán los cambios aplicados a la rama y el despliegue se quedará con el último commit con el despliegue exitoso.

# Siga este paso a paso para instalar la aplicacion localmente

### 1. Ingrese a la ruta del backend e instale dependencias
```bash
  cd ./backend/
```
```bash
  npm i
```
### 2. Ejecute aplicación 
```bash
  npm start
```
### 3. Ingrese a la ruta del frontend e instale dependencias
```bash
  cd ./forme-app/
```
```bash
  npm i
```
### 4. Ejecute aplicación 
```bash
  npm start
```
# En caso de que tenga docker, ejecute este comando
```bash
  docker-compose up
```

