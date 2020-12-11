<?php
include "inc/config.php";
include 'utils/php_debug.php';
include 'utils/is_localhost.php';
?>
<!DOCTYPE html>
<html lang="<?= SITE_LANG; ?>">
<?php include "inc/head.php"; ?>
<body data-page="demo">
	<div class="page">
		<?php include "inc/block-header.php"; ?>
		<main id="main">
			<?php include "inc/block-hero.php"; ?>
			<section class="page-content">
				<?php include "inc/block-naif-slider.php"; ?>
				<?php include "inc/block-typography.php"; ?>
			</section>
		</main>
	</div>
</body>
<?php include "inc/scripts.php"; ?>
</html>