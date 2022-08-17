
 <?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include '../Util/connection.php';

$conn = get_db_connection();
$table_name=$_GET['table_name'];
$resident_id=$_GET['resident_id'];
$select=$_GET['select'];

$sql = "SELECT UserBenefits.userId,$table_name.id,$table_name.$select FROM UserBenefits  
RIGHT JOIN $table_name ON UserBenefits.benefitId = $table_name.id and UserBenefits.userId='$resident_id'
and UserBenefits.benefitType='$table_name' GROUP BY $table_name.id";
// echo $sql;

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