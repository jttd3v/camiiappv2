<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // CORS preflight
}

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM applications ORDER BY created_at DESC');
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO applications (
            srn, date_applied, crew_type, photo_url,
            personal_info, contact_info, family_background,
            education, work_experience, sea_experience, status
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        $stmt->execute([
            $input['srn'] ?? null,
            $input['date_applied'] ?? null,
            $input['crew_type'] ?? null,
            $input['photo_url'] ?? null,
            json_encode($input['personal_info'] ?? []),
            json_encode($input['contact_info'] ?? []),
            json_encode($input['family_background'] ?? []),
            json_encode($input['education'] ?? []),
            json_encode($input['work_experience'] ?? []),
            json_encode($input['sea_experience'] ?? []),
            $input['status'] ?? 'draft'
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
