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
$router->get('/inicio',[PaginasController::class, 'index']);
$router->get('/dashboard',[PaginasController::class, 'dashboard']);
$router->get('/editarpedido',[PaginasController::class, 'editar']);
$router->get('/editarpedido',[PaginasController::class, 'editar']);


// API DE PRODUCTOS
$router->get('/api/productos',[APIController::class, 'index']);

$router->comprobarRutas();
