<?php
$ua = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');

if (strpos($ua, 'roblox') !== false || 
    strpos($ua, 'http.rb') !== false || 
    strpos($ua, 'mozilla/4.0') !== false ||
    preg_match('/executor|krnl|synapse|fluxus|electron/i', $ua)) {
    
    header('Content-Type: text/plain');
    echo 'print("Executor supported")\n';
    echo '-- Your actual Lua code here\n';
    echo 'return "Successfully loaded"';
} else {
    header('Content-Type: text/html');
    echo '<!DOCTYPE html><html><head><title>Protected Content</title></head>';
    echo '<body style="background:white;font-family:monospace;white-space:pre">';
    echo 'PRINT EXECUTOR NOT SUPPORTED\n';
    echo '-- This content is protected and cannot be viewed directly';
    echo '</body></html>';
}
?>
