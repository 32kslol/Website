<?php
// Set the user agent from the request headers
$user_agent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');

// List of executor patterns to detect
$executor_patterns = [
    'roblox',
    'http.rb',
    'mozilla/4.0',
    'lua',
    'executor',
    'krnl',
    'synapse',
    'fluxus',
    'electron',
    'script'
];

// Check if this is an executor request
$is_executor = false;
foreach ($executor_patterns as $pattern) {
    if (strpos($user_agent, $pattern) !== false) {
        $is_executor = true;
        break;
    }
}

// List of browser patterns
$browser_patterns = [
    'mozilla/5.0',
    'chrome',
    'safari',
    'firefox',
    'edge',
    'googlebot'
];

// Check if this is a browser request
$is_browser = false;
foreach ($browser_patterns as $pattern) {
    if (strpos($user_agent, $pattern) !== false) {
        $is_browser = true;
        break;
    }
}

// Serve appropriate content
if ($is_executor) {
    // For executors - return pure Lua code
    header('Content-Type: text/plain');
    echo 'print("Executor supported")\n';
    echo '-- Your actual protected Lua code goes here\n';
    echo 'return "Successfully loaded"';
} elseif ($is_browser) {
    // For browsers - return HTML with fake message
    header('Content-Type: text/html');
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Protected Content</title>
        <style>
            body {
                background: white;
                font-family: monospace;
                white-space: pre;
                margin: 20px;
            }
        </style>
    </head>
    <body>
    PRINT EXECUTOR NOT SUPPORTED
    -- This content is protected and cannot be viewed directly
    </body>
    </html>';
} else {
    // For anything else
    header('Content-Type: text/plain');
    echo 'ACCESS DENIED';
}

// Stop execution to prevent any additional output
exit;
?>
