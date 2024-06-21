<?php
namespace Controllers;
use MVC\Router;


class PaginasController{

    public static function index(Router $router){
        $router->render('Inicio');
    }
    public static function dashboard(Router $router){
        $router->render('editar');
    }
}