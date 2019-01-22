<?php include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/header.php'; ?>

		Hello <?php echo($theUserName); ?>
		New Customer
		<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

require('../../php/uuidautogen.php');
		?>
		
		<script>
			var userId = ("<?php echo($theUUID);?>");
		</script>
	</body>
</html>