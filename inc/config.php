<?php
define('BOOL_DEVELMODE',true);

function url($justbase=false){
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    }
    else{
        $protocol = 'http';
    }
    if(BOOL_DEVELMODE && !$justbase) {
        return $protocol . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }else{
        return $protocol . "://" . $_SERVER['HTTP_HOST'] . '/';
    }
}

define('SITE_LANG',"IT");
define('FE_URL', './');
define('DEV_URL', "http://localhost:3001/");

define('SITE_META_TITLE','ilfinoz');
define('SITE_META_DESCRIPTION','Faccio cose');