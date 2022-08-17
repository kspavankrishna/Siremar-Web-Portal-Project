<?php 
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Util/connection.php';

$data = json_decode((file_get_contents("php://input")));
$benefitId=$data->benefitId;
$userId = $data->userId;
$type = $data->type;
$conn = get_db_connection();
$sql = "INSERT INTO UserBenefits(benefitId,userId,benefitType) values ('$benefitId',
$userId,'$type')";
// echo $sql;
if($conn->query($sql) === true) {
    $response['message'] = 'success';
    echo json_encode($response);
} else {
    {echo "Error creating table: " . $conn->error;}
    $response['message'] = 'failed';
    echo json_encode($response);
}


?>