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
$fName=$_POST['fName'];
$password=$_POST['lName'];
$sql = "SELECT * FROM admin where username='".$fName."' and password='".$password."'";
//print($sql);
$result = $conn->query($sql);
//print_r($result);
if ($result->num_rows > 0) {
    echo 1;
} else {
    echo 0;
}


$conn->close();



//echo "Connected successfully";
?>