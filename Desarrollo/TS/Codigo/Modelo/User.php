<?php

namespace Model;
// use Model\ActiveRecord;

class User extends ActiveRecord {

    protected static $tabla = "usuarios" ;
    protected static $columnasDB = ['id', 'nombre','apellido', 'email','password', 'admin','telefono'] ;

    public $id, $nombre, $apellido, $email, $password, $admin, $telefono;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->admin = $args['admin'] ?? 0;
        $this->telefono = $args['telefono'] ?? '';
    }

    public function comprobarPassword( $passwordtmp){
        // $resultado  = password_verify( $passwordtmp, $this->password);

        if($this->password == $passwordtmp){
            
            return true;
        }else{
            return false;
        }
    }
}