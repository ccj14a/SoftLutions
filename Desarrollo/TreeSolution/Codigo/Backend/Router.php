<?php

namespace MVC;

class Router {

    public $rutasGET=[];
    public $rutasPOST=[];

    public function get($url, $fn){ //fn = funcion asociada a esa url
        $this->rutasGET[$url] = $fn;
    }

    public function comprobarRutas()
    {
        $urlActual = $_SERVER['PATH_INFO'] ?? '/';

        $metodo = $_SERVER['REQUEST_METHOD'];

        if($metodo == 'GET'){
            $fn = $this->rutasGET[$urlActual] ?? null;
        }

        if($fn){ 
            // si existe la url y hay una funcion asociada
            call_user_func($fn, $this);

        }else{
            echo " Pagina no encontrada";
        }
    }

    // Muestra una vista
    public function render($view){

        ob_start(); //Almacena en memoria

        //?MODIFICAR RUTA CUANDO ESTE EL FRONTEND
        include __DIR__. "/../Frontend/$view.html"; 
        $contenido = ob_get_clean();// Almacena el view en $contenido y limpia la memoria
        
        echo $contenido;
        //include_once __DIR__ . '';
    }
}