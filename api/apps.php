<?php
// apps.php - devuelve data/apps.json
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
$path = __DIR__ . '/../data/apps.json';
if(file_exists($path)){
    echo file_get_contents($path);
    exit;
}
echo json_encode([]);
?>
