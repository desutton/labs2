Hello World!\n

customers
http://localhost/labs2/php/api_methods/SELECTz.php?tableName=customers&columnNames=cust_UUID%20AS%20id,cust_company%20AS%20value,cust_invoiceKind&dataName=data&select=6

prices
http://localhost/labs2/php/api_methods/SELECTz.php?tableName=prices&columnNames=prices_id,prices_UUID,prices_testDescription,prices_unitPrice&dataName=data&select=5

invoice list
http://localhost/labs2/php/api_methods/SELECTz.php?tableName=invoice&columnNames=invoice_UUID,invoice_invoiceNumber,invoice_totalDue,invoice_paid,customers.cust_company&joinTable=customers&joinColumn=invoice_2custUUID&joinValue=customers.cust_id&sortby=customers.cust_company&sort=ASC&dataName=data&select=7

$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." JOIN ".$theJoinTable." ON ".$theJoinColumn." = ".$theJoinColumnValue." ORDER BY ".$theOrderColumn." ".$theOrderSort." LIMIT ".$rowLimits;


SELECT
`invoice`.`invoice_UUID`,
`customers`.`cust_company`,
`invoice`.`invoice_invoiceNumber`,
`invoice`.`invoice_totalDue`,
`invoice`.`invoice_paid`
FROM
`invoice`
JOIN `customers`
ON `invoice`.`invoice_2custUUID` = `customers`.`cust_id`
ORDER BY
`customers`.`cust_company` ASC