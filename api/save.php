<?php
header('Content-Type: application/json');

// Allow CORS during dev if needed, typically same origin is fine
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid JSON input']);
    exit;
}

$type = $input['type'] ?? '';
$data = $input['data'] ?? [];

$allowed = ['estudios', 'experiencias', 'apps', 'skills'];

if (!in_array($type, $allowed)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid type']);
    exit;
}

$file = __DIR__ . '/../data/' . $type . '.json';

// Ensure data is array
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Data must be an array']);
    exit;
}

if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['ok' => true, 'message' => 'Saved successfully']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Failed to write file']);
}
