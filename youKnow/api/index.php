<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
/** 
 * In this exercise, for the sake of simplicity I just allow all accesses
 * in a productive environment, it is important to only allow whats necessary and make sure,
 * that the access is further restrticted through an authentification process
*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
include 'helper.php';
$objDb = new DbConnect;
$helper = new Helper;
$conn = $objDb->connect();

$user = (file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];

// prepare data out of the request, if no data is transfered, use default values
$path = explode('/', $_SERVER['REQUEST_URI']);
$path_length = count($path);
$startDate = $path_length > 4 ? str_replace('%', ' ', $path[4]) : date('Y-m-d', 0);
$endDate = $path_length > 5 ? str_replace('%', ' ', $path[5]) : date('Y-m-d');
$client = $path_length > 6 ?  str_replace('%20', ' ', $path[6]) : '1 Internet SE';

// get the right query depending on the request and add data
$sql = $helper->getQuery($path[3]);
$stmt = $conn->prepare($sql);
if($path[3] === 'clientsTime'){
    $stmt->bindParam(':startDate', $startDate);
    $stmt->bindParam(':endDate', $endDate);
} elseif($path[3] === 'clientsUserTime'){
    $stmt->bindParam(':client', $client);
    $stmt->bindParam(':startDate', $startDate);
    $stmt->bindParam(':endDate', $endDate);
}

// execute query and send data back
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

?>