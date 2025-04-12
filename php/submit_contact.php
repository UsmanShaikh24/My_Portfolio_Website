<?php
require_once 'db_config.php';

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set headers to prevent caching
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');
    header('Content-Type: application/json');

    // Validate required fields
    $required_fields = ['name', 'email', 'subject', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
            echo json_encode([
                "status" => "error",
                "message" => "Please fill in all required fields."
            ]);
            exit;
        }
    }

    // Get form data
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $subject = $conn->real_escape_string(trim($_POST['subject']));
    $message = $conn->real_escape_string(trim($_POST['message']));
    $date = date('Y-m-d H:i:s');

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => "error",
            "message" => "Please enter a valid email address."
        ]);
        exit;
    }

    // Prepare SQL statement
    $sql = "INSERT INTO contact_messages (name, email, subject, message, submission_date) 
            VALUES (?, ?, ?, ?, ?)";
            
    // Use prepared statement
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("sssss", $name, $email, $subject, $message, $date);
        
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Thank you for your message! I will get back to you soon."
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Error: Unable to save your message."
            ]);
        }
        $stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Error: Database error occurred."
        ]);
    }
} else {
    header("Location: ../pages/contact.html");
}

$conn->close();
?> 