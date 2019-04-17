<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
July 1 2014

Version: Version 1

Universally Unique IDentifiers (UUID)
In every table throughout the database there is a UUID field. The motivation for
this field is two fold. First FileMaker needs it. Second when barcodes are crea-
ted the UUID is envoled in the QRCode. So when the user scans the QRCode the UUID
is used to pull up any row of data regardless of what it is and through a provid-
ed interface can manipulate that row of data. 
ie. A barcode is scanned and the UUID is for a row of data in the "methods" tab-
le is found. The program logic would then serach the database for the row, see 
it in the "methods" table and know to display the layout or UI for Methods. The
user whould make whatever modifications to the row and save it back to the db, 
without UUID modification. The UUID can be a primary key for all data. Thus is 
can also be used as foriegn keys to other tabels. It is a univeral (FMPro & EXT)
id field. While it might be used for leagacy, it is relied upon for many PHP s-
cripts. This script is NOT for security, nor should ever be used for such.  
*******************************************************************************/ 


require('uuidautogen.php');
echo($theUUID);

?>