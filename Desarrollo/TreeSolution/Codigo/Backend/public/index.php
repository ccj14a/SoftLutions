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
$router->get('/frontend',[PaginasController::class, 'index']);
$router->get('/editarpedido',[PaginasController::class, 'editar']);


// API DE PRODUCTOS
$router->get('/api/productos',[APIController::class, 'index']);

$router->comprobarRutas();
