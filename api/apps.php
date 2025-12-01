<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    $query = "SELECT a.*, GROUP_CONCAT(at.tecnologia) as tecnologias 
              FROM apps a
              LEFT JOIN app_tecnologias at ON a.id = at.app_id
              GROUP BY a.id
              ORDER BY a.destacado DESC, a.fecha_creacion DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $apps = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir tecnologias a array
    foreach ($apps as &$app) {
        if ($app['tecnologias']) {
            $app['tecnologias'] = explode(',', $app['tecnologias']);
        } else {
            $app['tecnologias'] = array();
        }
        // Convertir destacado a boolean
        $app['destacado'] = (bool)$app['destacado'];
    }

    echo json_encode($apps);
} else {
    echo json_encode(array("message" => "Error de conexión a la base de datos"));
}
?>
