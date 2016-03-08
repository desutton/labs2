<?php
			require_once('__php__.php');
			
			$sql_query = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel FROM users WHERE users_name = '".$theUserName."'";

			// PDO prepare statement for the database
			$stmt = $conn->prepare($sql_query);

			// Fire off the request to the db
			$stmt->execute();


			// Get back data then parse it into an php variables
			//$result = $stmt->fetch(PDO::FETCH_OBJ);
			
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// perform the JSON encode in the EXTJS format
			//$JSON_RESULTS = json_encode(array("success" => $errorcodes[$x], $theDataName => $results)); //works for Sencha
			$JSON_RESULTS = json_encode($results);
			echo($JSON_RESULTS); //Send back to JS the results from the db and server
			
		/*	$theFirstName = $result->users_firstname;
			$theLastName = $result->users_lastname;
			$theUserEmpId = $result->users_employeeId;
			$theUserPass = $result->users_pass;
			$theUserGroup = $result->users_2group;
			$theUserAccess = $result->users_2accessLevel;
			$theUUID = $result->users_UUID;
		*/	

?>