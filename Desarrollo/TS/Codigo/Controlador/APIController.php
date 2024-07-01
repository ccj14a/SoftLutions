<?php
namespace Controllers;

use Model\Producto;
use Model\Pedidos;

class APIController{

    public static function index(){
        $productos = Producto::all();
        echo json_encode($productos);
    }

    public static function crearPedido(){
        $pedido = new Pedidos($_POST);
        
    }
    
}