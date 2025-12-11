<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
// apps.php - devuelve el contenido de ../data/apps.json si existe
header('Content-Type: application/json; charset=utf-8');
$path = __DIR__ . '/../data/apps.json';
if(file_exists($path)){
    echo file_get_contents($path);
    exit;
}
echo json_encode([]);
} else {
    echo json_encode(array("message" => "Error de conexión a la base de datos."));
}
?>
