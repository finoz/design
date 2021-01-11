<header class="header">
	<div class="header-inner">
		<a class="a11y-skip-to-cta" href="#main">Skip to content</a>
		<a class="a11y-skip-to-cta" href="#footer">Skip to footer</a>
		<a href="#main" class="header-brand">
			<?php include 'images/logo.svg'; ?>
		</a>
		<div class="header-toggle-menu" aria-hidden="true">
			<div class="header-toggle-menu-inner"></div>
		</div>
		<nav class="header-navigation">
			<ul>
				<?php foreach ($navigationObject as $navitemname => $navitem) {
					if(is_array($navitem)){ ?>
						<li class="has-subnav">
							<a href="/<?= $navitemname; ?>"><?= $navitemname; ?></a>
							<div class="subnav-wrapper">
								<ul>
									<?php foreach ($navitem as $subitemname => $subitem) {
										if(is_array($subitem)){ ?>
											<li>
												<a href="/<?= $navitemname.'/'.$subitemname; ?>"><?= $subitemname; ?></a>
												<ul>
													<?php foreach ($subitem as $subsubitem) { ?>
														<li><a href="/<?= $navitemname.'/'.$subitemname.'/'.$subsubitem; ?>"><?= $subsubitem; ?></a></li>
													<?php } ?>
												</ul>
											</li>
										<?php } else { ?>
											<li><a href="?<?= $subitem; ?>"><?= $subitem; ?></a></li>
										<?php }
									} ?>
								</ul>
							</div>
						</li>
					<?php } else { ?>
						<li><a href="?<?= $navitem; ?>"><?= $navitem; ?></a></li>
					<?php }
				}; ?>
				<li class="header-navigation-highlight"><a href="#section-04">Contattaci</a></li>
			</ul>
		</nav>
	</div>
</header>