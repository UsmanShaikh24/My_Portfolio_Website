<?php
// Database configuration for Hostinger
$db_host = "your_hostinger_mysql_host"; // Usually localhost
$db_user = "your_hostinger_database_username";
$db_pass = "your_hostinger_database_password";
$db_name = "your_hostinger_database_name";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");
?> 