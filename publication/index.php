<?php
 ini_set('display_errors', E_ALL);
require("db/requires.php");
/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//include_once "templates/base.php";
session_start();
require_once realpath(dirname(__FILE__) . '/src/Google/autoload.php');

/************************************************
  ATTENTION: Fill in these values! Make sure
  the redirect URI is to this page, e.g:
  http://localhost:8080/user-example.php
 ************************************************/
/*  $client_id = '<YOUR_CLIENT_ID>';
 $client_secret = '<YOUR_CLIENT_SECRET>';
 $redirect_uri = '<YOUR_REDIRECT_URI>'; */
 
 $client_id = '568231754559-nn3bpempp9oj0ahgs1jcs6j134nhd98q.apps.googleusercontent.com';
 $client_secret = 'A-Wiz38LIlI1jxt9M5sNqyhF';
 $redirect_uri = 'http://abraham.brm.com.co/fabricaDeCajas/index.php';

/************************************************
  Make an API request on behalf of a user. In
  this case we need to have a valid OAuth 2.0
  token for the user, so we need to send them
  through a login flow. To do this we need some
  information from our API console project.
 ************************************************/
$client = new Google_Client()
;$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/userinfo.profile");
$client->addScope("https://www.googleapis.com/auth/userinfo.email");
//$gm_service = new Google_Service_Gmail($client);
/************************************************
  We are going to create both YouTube and Drive
  services, and query both.
 ************************************************/
$gm_service = new Google_Service_Oauth2($client);
//$dr_service = new Google_Service_Drive($client);
/************************************************
  Boilerplate auth management - see
  user-example.php for details.
 ************************************************/
if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $authUrl = $client->createAuthUrl();
}
/************************************************
  If we're signed in, retrieve channels from YouTube
  and a list of files from Drive.
 ************************************************/
if ($client->getAccessToken()) {
  $_SESSION['access_token'] = $client->getAccessToken();
	$gm_results = $gm_service->userinfo->get();
}
if (strpos($client_id, "googleusercontent") == false) {
  echo missingClientSecretsWarning();
  exit;
} 
if (isset($authUrl)) {
  $smarty->assign('enlace', $authUrl);
  $smarty->assign('msg', 'Bienvenido');
	$smarty->display("login.html");
    //header('Location:login.html');

} else {
	if($gm_results['hd']!=="brm.com.co" && $gm_results['hd']!=="preferente.com.co" ){
	/* echo "<pre>";
	print_r($gm_results); */
		$smarty->assign('enlace', $authUrl);
		$smarty->assign('msg', 'Aún no perteneces a brm');
		$smarty->display("login.html");
		//header('Location:index.php?logout');
	}else{
		//echo $gm_results['email'];
		$_SESSION['foto'] = $gm_results['picture'];
		$_SESSION['email'] = $gm_results['email'];
		$_SESSION['img']   = $gm_results['picture'];
		header('Location:fabrica.php');
		/* $smarty->display("grafica.html"); */
	}
} 