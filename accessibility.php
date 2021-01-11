<?php
include "inc/data.php";
include "inc/config.php";
include 'utils/php_debug.php';
include 'utils/is_localhost.php';
?>
<!DOCTYPE html>
<html lang="<?= SITE_LANG; ?>">
<?php include "inc/head.php"; ?>
<body data-page="accessibility">
	<div class="page">
		<?php include "inc/block-header-mega.php"; ?>
		<main id="main">
			<?php include "inc/block-form.php"; ?>
			<?php include "inc/block-hero.php"; ?>
			<?php include "inc/block-typography.php"; ?>
		</main>
		<?php include "inc/block-footer.php"; ?>
	</div>
</body>
<?php include "inc/scripts.php"; ?>
</html>