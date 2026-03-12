<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'vhibs_db');

// WhatsApp Configuration
define('WHATSAPP_NUMBER', '1234567890'); // Replace with actual WhatsApp number
define('WHATSAPP_API_URL', 'https://wa.me/');

// Site Configuration
define('SITE_URL', 'http://localhost/vhibs/vhibs/');
define('ADMIN_EMAIL', 'admin@vibehaus.com');

// Create database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset
$conn->set_charset("utf8mb4");

// Helper function for JSON responses
function sendJsonResponse($success, $message, $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Helper function for sanitizing input
function sanitizeInput($data) {
    global $conn;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $conn->real_escape_string($data);
}

// Helper function for file uploads
function uploadFile($file, $targetDir, $allowedTypes = ['jpg', 'jpeg', 'png', 'gif']) {
    $fileName = $file['name'];
    $fileSize = $file['size'];
    $fileTmp = $file['tmp_name'];
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Check if file type is allowed
    if (!in_array($fileType, $allowedTypes)) {
        return ['success' => false, 'message' => 'Invalid file type'];
    }

    // Check file size (max 5MB)
    if ($fileSize > 5000000) {
        return ['success' => false, 'message' => 'File size too large'];
    }

    // Generate unique filename
    $newFileName = uniqid() . '.' . $fileType;
    $targetPath = $targetDir . $newFileName;

    // Move file to target directory
    if (move_uploaded_file($fileTmp, $targetPath)) {
        return ['success' => true, 'message' => 'File uploaded successfully', 'fileName' => $newFileName];
    } else {
        return ['success' => false, 'message' => 'Error uploading file'];
    }
}
?>
