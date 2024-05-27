<?php
namespace Controllers;
use MVC\Router;


class PaginasController{

    public static function index(Router $router){
        $router->render('index');
    }
    public static function editar(Router $router){
        $router->render('editar');
    }
}