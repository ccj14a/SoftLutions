<?php
namespace Controllers;
use MVC\Router;


class PaginasController{

    public static function index(Router $router){
        $router->render('Inicio');
    }
    public static function dashboard(Router $router){
        $router->render('Dashboard');
    }
    public static function login(Router $router){
        $router->render('Login');
    }
    public static function registrarse(Router $router){
        $router->render('CrearCuenta');
    }
}