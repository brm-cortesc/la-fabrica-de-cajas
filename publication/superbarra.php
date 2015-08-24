<?php
 ini_set('display_errors', E_ALL);
require("db/requires.php"); 
if(isset($_SESSION['email']) && !empty($_SESSION['email'])){
	$smarty->display("superbarra.html"); 
}else{
	header("Location: index.php");
}
?>