<?php
<?php
// estudios.php - devuelve data/estudios.json
header('Content-Type: application/json; charset=utf-8');
$path = __DIR__ . '/../data/estudios.json';
if(file_exists($path)){
    echo file_get_contents($path);
    exit;
}
echo json_encode([]);
?>

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    $query = "SELECT * FROM estudios ORDER BY fecha_fin DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $estudios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($estudios);
} else {
    echo json_encode(array("message" => "Error de conexión a la base de datos"));
}
?>
