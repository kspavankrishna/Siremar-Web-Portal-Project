<?php 


function get_db_connection() {
    $servername = "localhost"; 
    $username = "root";
    $password = "";
    $dbname = "siremar";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        return null;
    }

    return $conn;

}


?>