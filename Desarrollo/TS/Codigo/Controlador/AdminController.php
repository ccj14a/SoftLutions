<?php
namespace Controllers;
use MVC\Router;

class AdminController {


    public static function index(Router $router){

        session_start();
        
        if($_SESSION){
            // En caso haya una sesion activa

            if($_SESSION['admin'] == true){
                $router->render('Dashboard_admin');        
            }else{
                header('Location: /dashboard');
            }
        }else{
            debuguear('NO HAY LOGIN DETECTADO');
        }
        // debuguear($_SESSION);

    }

}