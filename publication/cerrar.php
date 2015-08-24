<?php
ini_set('display_errors', 0);
require("db/requires.php");
session_destroy();
header("Location:index.php");
