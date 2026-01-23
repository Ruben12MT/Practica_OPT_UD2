# Practica_OPT_UD2 (Backend de Servicios Financieros)

Este repositorio contiene el servidor API desarrollado para la asignatura **Desarrollo de Interfaces**.  
El Backend está implementado utilizando **Node.js** , **Express** y  **Sequelize**, proporcionando una API RESTful para la gestión de bancos y sucursales.

---

## ⚠️ IMPORTANTE
Para que el ecosistema completo funcione correctamente, ten en cuenta lo siguiente:

### 🔹 1. Base de datos MySQL
El servidor requiere una base de datos MySQL activa. Asegúrate de tener el servicio arrancado antes de iniciar el servidor.

### 🔹 2. Relación con el Frontend
Este backend está diseñado para trabajar en conjunto con el repositorio de frontend:  
[Practica_DEINT_UD2 (Frontend)](https://github.com/Ruben12MT/Practica_DEINT_UD2.git)

### 🔹 3. Gestión de Imágenes
El backend guarda las imágenes en una ruta relativa al frontend. Es fundamental que ambos proyectos estén en el mismo directorio raíz y que la carpeta del frontend se llame exactamente **"Practica_DEINT_UD2"**.

---

## 🗄️ Configuración de la Base de Datos
El servidor se conecta utilizando las siguientes credenciales por defecto:

- **Host:** `localhost`
- **Database name:** `bancos_db`
- **User:** `root`
- **Password:** `test`

---

## 🚀 Endpoints de la API

### 🏦 Bancos (`/api/banks`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/banks/:id` | Obtiene la información detallada de un banco por su ID. |
| **POST** | `/api/banks/` | Crea un nuevo registro de banco. |
| **PUT** | `/api/banks/:id` | Actualiza los datos de un banco existente. |
| **DELETE** | `/api/banks/:id` | Elimina un banco de la base de datos. |
| **POST** | `/api/banks/upload-logo/:id` | Sube y asigna un logo (imagen) a un banco específico. |

### 📍 Sucursales (`/api/branches`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/branches/` | Obtiene todas las sucursales o filtra por parámetros (query strings). |
| **GET** | `/api/branches/:id` | Obtiene la información de una sucursal por ID. |
| **POST** | `/api/branches/` | Crea una nueva sucursal. |
| **PUT** | `/api/branches/:id` | Actualiza los datos de una sucursal existente. |
| **DELETE** | `/api/branches/:id` | Borra una sucursal de la base de datos. |

---

## ▶️ Pasos para ejecutar el proyecto

### 1. **Clonar el repositorio**
Descarga el proyecto en tu máquina local:
```bash
git clone git@github.com:Ruben12MT/Practica_OPT_UD2.git
```
### 2. **Dirigete a la carpeta generada y ábrela en una terminal**

O en la ruta de la carpeta del proyecto:
```bash
cd Practica_OPT_UD2
```
### 3. **Instalar las dependencias**

Dentro de la carpeta del proyecto:
```bash
npm install
```
### 4. **Instalar las dependencias**

Eliminar vulnerabilidades (Si hay algunas):
```bash
npm audit fix 
```

### 5. **Arrancar el servidor en modo desarrollo**

Ejecuta el proyecto con:
```bash
npm run dev
```



