<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Util/connection.php';

$conn = get_db_connection();
$table_name=$_GET['table_name'];
$select=$_GET['select'];
if(isset($_GET['condition'])){
    $condition=$_GET['condition'];
}

$sql = "SELECT COUNT(Users.first_name) as 'Number of Residents registered',
$table_name.$select FROM UserBenefits  
INNER JOIN Users ON UserBenefits.userId=Users.id 
INNER JOIN $table_name ON UserBenefits.benefitId = $table_name.id";

if(isset($_GET['condition'])){
    $sql=$sql . $condition;

}
// echo $sql;

// if(isset($_GET['condition'])){
//     $sql=$sql . $condition;

// }
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