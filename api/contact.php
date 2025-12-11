<?php
// contact.php - recibe POST del formulario de contacto y guarda mensaje en api/messages.txt
header('Content-Type: application/json; charset=utf-8');
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode(['ok'=>false,'message'=>'Método no permitido']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if(!$name || !$email || !$message){
    http_response_code(400);
    echo json_encode(['ok'=>false,'message'=>'Faltan campos']);
    exit;
}

$safe = date('c').' | '.filter_var($email,FILTER_SANITIZE_EMAIL).' | '.str_replace(["\r","\n"],' ',$name)."\n".$message."\n---\n";
$dir = __DIR__;
$file = $dir . '/messages.txt';
file_put_contents($file, $safe, FILE_APPEND | LOCK_EX);

// You can add mail() here if the server supports it.
echo json_encode(['ok'=>true,'message'=>'Mensaje recibido, gracias']);

?>
