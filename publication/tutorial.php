<?php
 ini_set('display_errors', 1);
 error_reporting(E_ALL);
require("db/requires.php"); 
if(isset($_SESSION['email']) && !empty($_SESSION['email'])){
	$get=$_GET["herramienta"];
	if($get=="superbarra" || $get=="kang" || $get=="kodos" || $get=="linguo" || $get=="krustyland"){
		$smarty->assign("video",$get);
		$smarty->display("tutorial.html"); 
	}else{	
		#header("Location:fabrica.php");
	}
}else{
	header("Location:fabrica.php");
	

	//header("Location: login.php");
}
?>