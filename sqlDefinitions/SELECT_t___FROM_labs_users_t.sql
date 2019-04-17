INSERT INTO labs.users (users_id, users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass,
                        users_2group, users_2accessLevel, users_displayName, users_manager, users_managerID,
                        users_authorized)
VALUES (1, '0', 'David', 'Sutton', 'dsutton', 10, '123', '0', '10', 'David Sutton', 'Yes', 1, 'No');
INSERT INTO labs.users (users_id, users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass,
                        users_2group, users_2accessLevel, users_displayName, users_manager, users_managerID,
                        users_authorized)
VALUES (2, '1', 'Ronald', 'Sutton', 'rsutton', 1, '123', '1', '1', 'Ronald Sutton', 'Yes', 1, 'Yes');