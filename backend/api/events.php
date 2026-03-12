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
                getAllEvents();
            } elseif ($action === 'get_published') {
                getPublishedEvents();
            } elseif ($action === 'get_by_id') {
                getEventById();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'POST':
            if ($action === 'create') {
                createEvent();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'PUT':
            if ($action === 'update') {
                updateEvent();
            } else {
                sendJsonResponse(false, 'Invalid action');
            }
            break;

        case 'DELETE':
            if ($action === 'delete') {
                deleteEvent();
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

// Get all events (for admin)
function getAllEvents() {
    global $conn;

    $query = "SELECT * FROM events ORDER BY date ASC";
    $result = $conn->query($query);

    if ($result) {
        $events = [];
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        sendJsonResponse(true, 'Events retrieved successfully', $events);
    } else {
        sendJsonResponse(false, 'Error retrieving events');
    }
}

// Get published events (for frontend)
function getPublishedEvents() {
    global $conn;

    $query = "SELECT * FROM events WHERE status = 'published' AND date >= CURDATE() ORDER BY date ASC";
    $result = $conn->query($query);

    if ($result) {
        $events = [];
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        sendJsonResponse(true, 'Published events retrieved successfully', $events);
    } else {
        sendJsonResponse(false, 'Error retrieving published events');
    }
}

// Get event by ID
function getEventById() {
    global $conn;

    if (!isset($_GET['id'])) {
        sendJsonResponse(false, 'Event ID is required');
    }

    $id = sanitizeInput($_GET['id']);
    $query = "SELECT * FROM events WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $event = $result->fetch_assoc();
        sendJsonResponse(true, 'Event retrieved successfully', $event);
    } else {
        sendJsonResponse(false, 'Event not found');
    }
}

// Create new event
function createEvent() {
    global $conn;

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!isset($input['title']) || !isset($input['date']) || !isset($input['time']) || 
        !isset($input['location']) || !isset($input['price'])) {
        sendJsonResponse(false, 'Missing required fields');
    }

    // Handle image upload if provided
    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadResult = uploadFile($_FILES['image'], '../uploads/events/');
        if (!$uploadResult['success']) {
            sendJsonResponse(false, $uploadResult['message']);
        }
        $imagePath = $uploadResult['fileName'];
    }

    // Prepare and execute query
    $query = "INSERT INTO events (title, description, date, time, location, venue_details, image, price, capacity, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssssdss', 
        $input['title'],
        $input['description'],
        $input['date'],
        $input['time'],
        $input['location'],
        $input['venue_details'],
        $imagePath,
        $input['price'],
        $input['capacity'],
        $input['status']
    );

    if ($stmt->execute()) {
        sendJsonResponse(true, 'Event created successfully', ['id' => $conn->insert_id]);
    } else {
        sendJsonResponse(false, 'Error creating event');
    }
}

// Update event
function updateEvent() {
    global $conn;

    if (!isset($_GET['id'])) {
        sendJsonResponse(false, 'Event ID is required');
    }

    $id = sanitizeInput($_GET['id']);
    $input = json_decode(file_get_contents('php://input'), true);

    // Handle image upload if provided
    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadResult = uploadFile($_FILES['image'], '../uploads/events/');
        if (!$uploadResult['success']) {
            sendJsonResponse(false, $uploadResult['message']);
        }
        $imagePath = $uploadResult['fileName'];
    }

    // Build update query
    $query = "UPDATE events SET title=?, description=?, date=?, time=?, location=?, venue_details=?, price=?, capacity=?, status=?";
    $params = [
        &$input['title'],
        &$input['description'],
        &$input['date'],
        &$input['time'],
        &$input['location'],
        &$input['venue_details'],
        &$input['price'],
        &$input['capacity'],
        &$input['status']
    ];

    // Add image to query if provided
    if ($imagePath !== null) {
        $query .= ", image=?";
        $params[] = &$imagePath;
    }

    $query .= " WHERE id=?";
    $params[] = &$id;

    $stmt = $conn->prepare($query);
    $types = str_repeat('s', count($params) - 1) . 'i';
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        sendJsonResponse(true, 'Event updated successfully');
    } else {
        sendJsonResponse(false, 'Error updating event');
    }
}

// Delete event
function deleteEvent() {
    global $conn;

    if (!isset($_GET['id'])) {
        sendJsonResponse(false, 'Event ID is required');
    }

    $id = sanitizeInput($_GET['id']);

    // Get event image to delete
    $query = "SELECT image FROM events WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $event = $result->fetch_assoc();
        if ($event['image']) {
            $imagePath = '../uploads/events/' . $event['image'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
    }

    // Delete event
    $query = "DELETE FROM events WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        sendJsonResponse(true, 'Event deleted successfully');
    } else {
        sendJsonResponse(false, 'Error deleting event');
    }
}
?>
