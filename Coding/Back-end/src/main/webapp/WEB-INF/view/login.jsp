<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <fmt:setBundle basename="messages"/>
    <fmt:message key="message.password" var="noPass"/>
    <fmt:message key="message.username" var="noUser"/>
</head>
<body>
<h1>Login</h1>
    <form name='f' action="login" method='POST' onsubmit="validate()">
        <table>
            <tr>
                <td>User:</td>
                <td><input type='text' name='username' value=''></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><input type='password' name='password' /></td>
            </tr>
            <tr>
                <td><input name="submit" type="submit" value="submit" /></td>
            </tr>
        </table>
    </form>
    <script type="text/javascript">
        function validate() {
            if (document.f.username.value == "" && document.f.password.value == "") {
                alert("${noUser} and ${noPass}");
                document.f.username.focus();
                return false;
            }
            if (document.f.username.value == "") {
                alert("${noUser}");
                document.f.username.focus();
                return false;
            }
            if (document.f.password.value == "") {
                alert("${noPass}");
                document.f.password.focus();
                return false;
            }
        }
    </script>
</body>
</html>