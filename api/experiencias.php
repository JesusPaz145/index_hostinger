<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    $query = "SELECT e.*, GROUP_CONCAT(et.tecnologia) as tecnologias 
              FROM experiencias e
              LEFT JOIN experiencia_tecnologias et ON e.id = et.experiencia_id
              GROUP BY e.id
              ORDER BY e.fecha_fin DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $experiencias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir tecnologias a array y formatear campos
    foreach ($experiencias as &$exp) {
        if ($exp['tecnologias']) {
            $exp['tecnologias'] = explode(',', $exp['tecnologias']);
        } else {
            $exp['tecnologias'] = array();
        }
        // Formatear periodo
        $exp['periodo'] = date('Y', strtotime($exp['fecha_inicio'])) . ' - ' . 
                         ($exp['actual'] ? 'Presente' : date('Y', strtotime($exp['fecha_fin'])));
    }

    // experiencias.php - devuelve data/experiencias.json
    $path = __DIR__ . '/../data/experiencias.json';
    if(file_exists($path)){
        echo file_get_contents($path);
        exit;
    }
    echo json_encode([]);
} else {
    echo json_encode(array("message" => "Error de conexión a la base de datos"));
}
?>
