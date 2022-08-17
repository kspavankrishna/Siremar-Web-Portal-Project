<?php

$servername = "localhost";
$username = "root";
$password = "6,uCs2}c9pg#";
$db = "mxm9268_siremar";

// Create connection
$con = mysqli_connect($servername, $username, $password,$db);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>