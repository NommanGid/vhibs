<?php
require_once '../config.php';

header('Content-Type: application/json');

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Get action from query parameter
$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    switch ($method) {
        case 'GET':
            if ($action === 'get_all') {
                getAllGallery();
            } elseif ($action === 'get_active') {
                getActiveGallery();
            } elseif ($action === 'get_by_id') {
                getGalleryById();
            } elseif ($action === 'get_by_category') {
                getGalleryByCategory();
            } elseif ($action === 'get_by_event') {
                getGalleryByEvent();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'POST':
            if ($action === 'create') {
                createGalleryItem();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'PUT':
            if ($action === 'update') {
                updateGalleryItem();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'DELETE':
            if ($action === 'delete') {
                deleteGalleryItem();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        default:
            sendJsonResponse(false, 'Invalid request method');
    }
} catch (Exception $e) {
    sendJsonResponse(false, 'Error: ' . $e->getMessage());
}

// Get all gallery items (for admin)
function getAllGallery() {
    global $conn;

    $query = "SELECT g.*, e.title as event_title 
              FROM gallery g 
              LEFT JOIN events e ON g.event_id = e.id 
              ORDER BY g.display_order ASC, g.created_at DESC";
    $result = $conn->query($query);

    if ($result) {
        $gallery = [];
        while ($row = $result->fetch_assoc()) {
            $gallery[] = $row;
        }
        sendJsonResponse(true, 'Gallery items retrieved successfully', $gallery);
    } else {
        sendJsonResponse(false, 'Error retrieving gallery items');
    }
}

// Get active gallery items (for frontend)
function getActiveGallery() {
    global $conn;

    $query = "SELECT g.*, e.title as event_title 
              FROM gallery g 
              LEFT JOIN events e ON g.event_id = e.id 
              WHERE g.status = 'active'
              ORDER BY g.display_order ASC, g.created_at DESC";
    $result = $conn->query($query);

    if ($result) {
        $gallery = [];
        while ($row = $result->fetch_assoc()) {
            $gallery[] = $row;
        }
        sendJsonResponse(true, 'Active gallery items retrieved successfully', $gallery);
    } else {
        sendJsonResponse(false, 'Error retrieving active gallery items');
    }
}

// Get gallery item by ID
function getGalleryById() {
    global $conn;

    if (!isset($_GET['id'])) {
        sendJsonResponse(false, 'Gallery item ID is required');
    }

    $id = sanitizeInput($_GET['id']);
    $query = "SELECT g.*, e.title as event_title 
              FROM gallery g 
              LEFT JOIN events e ON g.event_id = e.id 
              WHERE g.id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $item = $result->fetch_assoc();
        sendJsonResponse(true, 'Gallery item retrieved successfully', $item);
    } else {
        sendJsonResponse(false, 'Gallery item not found');
    }
}

// Get gallery by category
function getGalleryByCategory() {
    global $conn;

    if (!isset($_GET['category'])) {
        sendJsonResponse(false, 'Category is required');
    }

    $category = sanitizeInput($_GET['category']);
    $query = "SELECT g.*, e.title as event_title 
              FROM gallery g 
              LEFT JOIN events e ON g.event_id = e.id 
              WHERE g.category = ? AND g.status = 'active'
              ORDER BY g.display_order ASC, g.created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $category);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $gallery = [];
        while ($row = $result->fetch_assoc()) {
            $gallery[] = $row;
        }
        sendJsonResponse(true, 'Gallery items retrieved successfully', $gallery);
    } else {
        sendJsonResponse(false, 'Error retrieving gallery items');
    }
}

// Get gallery by event
function getGalleryByEvent() {
    global $conn;

    if (!isset($_GET['event_id'])) {
        sendJsonResponse(false, 'Event ID is required');
    }

    $eventId = sanitizeInput($_GET['event_id']);
    $query = "SELECT g.*, e.title as event_title 
              FROM gallery g 
              LEFT JOIN events e ON g.event_id = e.id 
              WHERE g.event_id = ? AND g.status = 'active'
              ORDER BY g.display_order ASC, g.created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $eventId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $gallery = [];
        while ($row = $result->fetch_assoc()) {
            $gallery[] = $row;
        }
        sendJsonResponse(true, 'Gallery items retrieved successfully', $gallery);
    } else {
        sendJsonResponse(false, 'Error retrieving gallery items');
    }
}

// Create new gallery item
function createGalleryItem() {
    global $conn;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['title']) || !isset($input['image_url'])) {
        sendJsonResponse(false, 'Title and image URL are required');
    }

    $title = sanitizeInput($input['title']);
    $imageUrl = sanitizeInput($input['image_url']);
    $description = isset($input['description']) ? sanitizeInput($input['description']) : '';
    $category = isset($input['category']) ? sanitizeInput($input['category']) : 'general';
    $eventId = isset($input['event_id']) ? sanitizeInput($input['event_id']) : null;
    $status = isset($input['status']) ? sanitizeInput($input['status']) : 'active';
    $displayOrder = isset($input['display_order']) ? sanitizeInput($input['display_order']) : 0;

    $query = "INSERT INTO gallery (title, image_url, description, category, event_id, status, display_order, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssisi', $title, $imageUrl, $description, $category, $eventId, $status, $displayOrder);

    if ($stmt->execute()) {
        $newId = $conn->insert_id;
        sendJsonResponse(true, 'Gallery item created successfully', ['id' => $newId]);
    } else {
        sendJsonResponse(false, 'Error creating gallery item');
    }
}

// Update gallery item
function updateGalleryItem() {
    global $conn;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['id'])) {
        sendJsonResponse(false, 'Gallery item ID is required');
    }

    $id = sanitizeInput($input['id']);
    $title = isset($input['title']) ? sanitizeInput($input['title']) : null;
    $imageUrl = isset($input['image_url']) ? sanitizeInput($input['image_url']) : null;
    $description = isset($input['description']) ? sanitizeInput($input['description']) : null;
    $category = isset($input['category']) ? sanitizeInput($input['category']) : null;
    $eventId = isset($input['event_id']) ? sanitizeInput($input['event_id']) : null;
    $status = isset($input['status']) ? sanitizeInput($input['status']) : null;
    $displayOrder = isset($input['display_order']) ? sanitizeInput($input['display_order']) : null;

    $updates = [];
    $params = [];
    $types = '';

    if ($title !== null) {
        $updates[] = "title = ?";
        $params[] = $title;
        $types .= 's';
    }
    if ($imageUrl !== null) {
        $updates[] = "image_url = ?";
        $params[] = $imageUrl;
        $types .= 's';
    }
    if ($description !== null) {
        $updates[] = "description = ?";
        $params[] = $description;
        $types .= 's';
    }
    if ($category !== null) {
        $updates[] = "category = ?";
        $params[] = $category;
        $types .= 's';
    }
    if ($eventId !== null) {
        $updates[] = "event_id = ?";
        $params[] = $eventId;
        $types .= 'i';
    }
    if ($status !== null) {
        $updates[] = "status = ?";
        $params[] = $status;
        $types .= 's';
    }
    if ($displayOrder !== null) {
        $updates[] = "display_order = ?";
        $params[] = $displayOrder;
        $types .= 'i';
    }

    if (empty($updates)) {
        sendJsonResponse(false, 'No fields to update');
    }

    $updates[] = "updated_at = NOW()";
    $params[] = $id;
    $types .= 'i';

    $query = "UPDATE gallery SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        sendJsonResponse(true, 'Gallery item updated successfully');
    } else {
        sendJsonResponse(false, 'Error updating gallery item');
    }
}

// Delete gallery item
function deleteGalleryItem() {
    global $conn;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['id'])) {
        sendJsonResponse(false, 'Gallery item ID is required');
    }

    $id = sanitizeInput($input['id']);

    $checkQuery = "SELECT id FROM gallery WHERE id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        sendJsonResponse(false, 'Gallery item not found');
    }

    $deleteQuery = "DELETE FROM gallery WHERE id = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        sendJsonResponse(true, 'Gallery item deleted successfully');
    } else {
        sendJsonResponse(false, 'Error deleting gallery item');
    }
}
?>
