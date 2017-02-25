<?php
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
$CName=$_POST['CName'];
$PName=$_POST['PName'];
// $sql = "INSERT INTO categories (category,subcategory) VALUES (".$CName.",".$SCName.")";
// print($sql);
// $result = $conn->query($sql);

$link = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);

$statement = $link->prepare("INSERT INTO products (category,product) VALUES (:category,:product)");
$statement->execute(array(
    "category" => $CName,
    "product" => $PName,
));


$conn->close();



echo 1;
?>