<?php
if(BOOL_DEVELMODE && isLocalhost()) {
	$dist_path = DEV_URL;
}else{
	$dist_path = FE_URL;
};	?>
<script src='<?= $dist_path ?>dist/app.js' async></script>