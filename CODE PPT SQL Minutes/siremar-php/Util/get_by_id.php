<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include './connection.php';

$conn = get_db_connection();
$data = json_decode((file_get_contents("php://input")));
$table_name= $_GET['table_name'];
$id=$_GET['id'];
$sql = "SELECT * from  $table_name where id=$id";
// $result = $conn->query($sql);
// echo json_encode($result->fetch_all(MYSQLI_ASSOC));
if($conn->query($sql)) {
    $response['message'] = 'success';
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
} else {
    {echo "Error creating table: " . $conn->error;}
    $response['message'] = 'failed';
    echo json_encode($response);
}

?>