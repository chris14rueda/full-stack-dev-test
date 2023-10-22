# Todo App

This repository contains two projects: a Laravel-based API backend and a React TypeScript frontend for a Todo app.

## Prerequisites

Before you begin working with these projects, ensure that you have the following prerequisites installed:

### For the API Backend

- [PHP](https://www.php.net/) (Recommended version: 8 or later)
- [Composer](https://getcomposer.org/)
- [Laravel](https://laravel.com/docs/10.x#installation)
- [MySQL](https://dev.mysql.com/downloads/) or a database of your choice

### For the React TypeScript Frontend

- [Node.js](https://nodejs.org/) (Recommended version: 14.x or later)
- You can choose either [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/en/) for managing dependencies.
- [React](https://reactjs.org/)


## Project 1: API Backend (api-backend)

The API backend is built using Laravel and provides the necessary endpoints for managing a Todo app.

### Features

- Create, Read, Update, and Delete (CRUD) operations for Todo items.
- Validation and error handling for robust API interactions.

### Getting Started

To get started with the API backend, follow these steps:

1. Clone this repository.

```bash
git clone https://github.com/chris14rueda/full-stack-dev-test.git
```

2. Navigate to the `api-backend` directory.

```
cd api-backend
```

3. Install the dependencies.
```
composer install
```
4. Configure your environment by creating a `.env` file. You can use the `.env.example` as a template.
5. Generate application key.
```
php artisan key:generate
```
6. Run migrations.
```
php artisan migrate
```
7. Start the Laravel development server.


## Project 2: React TypeScript Frontend (frontend)

The React TypeScript frontend is responsible for providing a user interface for interacting with the Todo app.

### Getting Started

1. Navigate to the `frontend` directory.

```
cd frontend
```
2. Install the required dependencies.
```
npm install
```
or
```
yarn install
```
3. Configure the Base API url in the `.env` file to point to your API backend.
4. Start the development server.
```
npm run dev
```
or
```
yarn dev
```





