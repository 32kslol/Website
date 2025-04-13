<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Executor Detection</title>
    <style>
        #content {
            display: none;
        }
        #blocked {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="content">
        <!-- Your legit script or download link or whatever you want to show -->
        <p>Welcome, script is available.</p>
        <script src="yourscript.js"></script>
    </div>

    <div id="blocked">
        <!-- Message if no proper user agent -->
        <p>Access denied. Missing or invalid user agent.</p>
    </div>

    <script>
        const userAgent = navigator.userAgent;

        // Basic check: show content only if there's a user agent and it's not suspiciously empty
        if (userAgent && userAgent.trim().length > 0) {
            document.getElementById('content').style.display = 'block';
            document.getElementById('blocked').style.display = 'none';
        } else {
            // This would happen only in weird cases or some bot/executor setups
            document.getElementById('blocked').style.display = 'block';
        }

        console.log("User-Agent:", userAgent); // Optional debug log
    </script>
</body>
</html>
