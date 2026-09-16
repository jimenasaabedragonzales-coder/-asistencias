<?php
require_once "../src/Models/Productos.php";
class ProductoController{
    public function getAll()
    {
        $producto=Productos::all();
        echo json_encode(producto);
         
    }
}