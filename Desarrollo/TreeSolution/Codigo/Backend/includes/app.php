<?php 

use Model\Producto;
require __DIR__ . '/../vendor/autoload.php';

require 'database.php';

$db = conectarDb();

$producto = new Producto;

Producto::setDB($db);