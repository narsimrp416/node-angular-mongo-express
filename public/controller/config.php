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
$SCName=$_POST['SCName'];
// $sql = "INSERT INTO categories (category,subcategory) VALUES (".$CName.",".$SCName.")";
// print($sql);
// $result = $conn->query($sql);

$link = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);

$statement = $link->prepare("INSERT INTO categories (category,subcategory) VALUES (:category,:subcategory)");
$statement->execute(array(
    "category" => $CName,
    "subcategory" => $SCName,
));


$conn->close();



echo 1;
?>