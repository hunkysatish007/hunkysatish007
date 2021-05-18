<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import ="java.util.*"%>

<!DOCTYPE html> 
<html> 
<head>
	<title>Error Page</title>
</head>
<body>
${model.errorContents}
<!-- <h1>
	The application failed to generate the Production HTML File. Please report this problem to mobilous with your username and project number.
</h1>
 --></body>
</html>
