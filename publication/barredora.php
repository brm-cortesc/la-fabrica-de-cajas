<?php
 ini_set('display_errors', E_ALL);
require("db/requires.php"); 
if(isset($_SESSION['email']) && !empty($_SESSION['email'])){
	$smarty->display("barredora.html"); 
}else{
	$smarty->display("barredora.html"); 

	//header("Location: login.php");
}
?>