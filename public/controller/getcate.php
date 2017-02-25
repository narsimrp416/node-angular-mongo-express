<?php 
//echo '[{"Category":"Category1","SubCategory":"SubCategory1"},{"Category":"Category1","SubCategory":"SubCategory1"},{"Category":"Category1","SubCategory":"SubCategory1"}]';
//die();
$servername = "localhost";
$username = "root";
$password = "";
$dbname="ecom";
/// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// $sql = "INSERT INTO categories (category,subcategory) VALUES (".$CName.",".$SCName.")";
// print($sql);
// $result = $conn->query($sql);

$link = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);



$sql = "SELECT * FROM categories";
$result=$conn->query($sql);
if($result->num_rows>0){
	$array=array();
	$i=0;
	while($row=$result->fetch_assoc()){
		$array[$i]["cate_id"]=$row["cate_id"];
		$array[$i]["category"]=$row["category"];
		$array[$i]["subcategory"]=$row["subcategory"];
		$i++;
	}
	echo json_encode($array);
}

$conn->close();



//echo "Connected successfully";
?>