<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include './connection.php';

$conn = get_db_connection();
$select=$_GET['select'];
$table_name=$_GET['table_name'];
if(isset($_GET['condition'])){
    $condition=$_GET['condition'];
}

$sql = "SELECT $select from $table_name ";
// echo $sql;

if(isset($_GET['condition'])){
    $sql=$sql . $condition;

}
$result = $conn->query($sql);

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