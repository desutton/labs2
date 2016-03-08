<?php
/*			
			Read Brian Vanderberg writes in:

I have found that in some environments DOCUMENT_ROOT does not seem to be properly set. I have devised a way that is independent of the server, and whether the hosting provider provides the ability to set an include or auto-prepend path as well.

Each directory contains a 'meta' file called '__php__.php' (or whatever one wants to call it). For any files in that directory, they simply include it as <?php include('__php__.php'); ?>. The file itself simply includes the one in the parent directory all the way up to the site root. The file in the site root then can include other files, a simply way of auto-including files even if a service provider does not support it, and also define a variable such as 'SITE_ROOTDIR', which can then be used later. If the document files are moved to another directory, they will still include the __php__.php file in that directory and still get the SITE_ROOTDIR constant from the top __php__.php file.

I also do something similar for a simple navigation bar, where each directory has a __navbar__.php file, and each page simply includes it at the correct location and it can include parent navigation elements and define its own navigation elements.

One advantage of this is that a part of the site can be sectioned in a sub-directory, and still get the root of that part, even if it isn't the actual document root. A disadvantage is that it may slow down while doing all the includes on a site with heavy traffic.
*/

			//Set the root path to the public_html or www folder
			$SITE_ROOT = ( $_SERVER['DOCUMENT_ROOT']);
			
			//Set the paths to the these resources need by almost every php file.
			$UUIDPath = $SITE_ROOT."/php/uuidautogen.php";
			$ServerCon = $SITE_ROOT."/php/intercon/servercon.php";
			$ErrorCodes = $SITE_ROOT.'/php/errorcodes.php';
						
			//Not sure if these should be here.
			require_once($UUIDPath);
			require_once($ServerCon);
			require_once($ErrorCodes);
?>	
