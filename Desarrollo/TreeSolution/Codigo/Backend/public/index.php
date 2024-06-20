<?php

include __DIR__ . '/../includes/app.php';

use Controllers\APIController;
use Model\Producto;

use MVC\Router;
use Controllers\PaginasController;
//Metodo para obtener todos los productos de la db
// $productos = Producto::all();
// debuguear($productos);

$router = new Router();

// RUTAS DEL CLIENTE 
$router->get('/',[PaginasController::class, 'index']);
$router->get('/dashboard',[PaginasController::class, 'dashboard']);
$router->get('/login',[PaginasController::class, 'login']);
$router->get('/registrarse',[PaginasController::class, 'registrarse']);


// API DE PRODUCTOS
$router->get('/api/productos',[APIController::class, 'index']);

$router->comprobarRutas();
