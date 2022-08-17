<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Util/connection.php';

$conn = get_db_connection();
$data = json_decode((file_get_contents("php://input")));
$email=$data->email;
$password=$data->password;
$sql = "SELECT * from Users where email='$email' and password='$password'";
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