<?php 

namespace Controllers;
use MVC\Router;
use Model\User;


class LoginController{


    public static function login(Router $router){
        
        if( $_SERVER['REQUEST_METHOD'] === 'POST'){
            //creamos un objeto User con los datos enviados a trabes del formulario(post)
            $usuariotmp = new User($_POST);

            //buscamos un Usuario donde el email sea el ingresado por form
            $usuario = User::where('email', $usuariotmp->email);
            // debuguear($usuario);

            if($usuario){
                //Comprobamos el password del usuario correspondiante al Email, con la contraseña ingresada en form:
                if($usuario->comprobarPassword($usuariotmp->contrasena)){
                    session_start();
                    $_SESSION['id'] = $usuario->id;
                    $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                    $_SESSION['email'] = $usuario->email;
                    $_SESSION['login'] = true;
                    

                    //redireccionar
                    if($usuario->usuario == "admin"){
                        $_SESSION['admin'] = true;
                        header('Location: /admin');
                    }else{
                        header('Location: /dashboard');
                    }

                }else{
                    User::setAlerta('error', 'Password Incorrecto');
                }
            }else{
                User::setAlerta('error', 'Correo no registrado');
            }


        }
        $alertas = User::getAlertas();


        $router->render('Login', [
            'alertas' => $alertas
        ]);

    }

    public static function logout(){

        session_start();
        $_SESSION = [];

        header('Location: /');
    }

    public static function crearCuenta(Router $router){

        if( $_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuariotmp = new User($_POST);
        
            //Comprobamos que el correo no exista en otro usuario
            $usuario = User::where('email', $usuariotmp->email);
            
            if($usuario){
                //alerta, correo ya registrado.
                debuguear('Correo ya registrado');
            }else{
                $resultado  = $usuariotmp->guardar();
                if($resultado){
                    User::setAlerta('error', 'Usuario registrado con exito');
                    $alertas = User::getAlertas();

                    header('Location: /dashboard');
                }
            }
        }else{
            $router->render('CrearCuenta');
        }


    }
}