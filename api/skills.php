<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    $query = "SELECT * FROM skills ORDER BY nivel DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $skills = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($skills);
} else {
    echo json_encode(array("message" => "Error de conexión a la base de datos"));
}
?>
