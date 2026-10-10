<?php
$projectRoot = dirname(__DIR__, 3);
$config = parse_ini_file($projectRoot . DIRECTORY_SEPARATOR . '.env');

if ($config === false) {
	throw new RuntimeException('No se encontro el archivo .env');
}

define('HOST', $config['DB_HOST'] ?? '');
define('DATABASE', $config['DB_NAME'] ?? '');
define('USERNAME', $config['DB_USER'] ?? '');
define('PASSWORD', $config['DB_PASSWORD'] ?? '');
define('PORT', $config['DB_PORT'] ?? 3306);
$charset = $config['DB_CHARSET'] ?? 'utf8mb4';
define('CHARSET', str_replace('charset=', '', $charset));
$sslCa = trim((string) ($config['DB_SSL_CA'] ?? ''), " \t\n\r\0\x0B\"'");

if ($sslCa !== '' && !preg_match('/^(?:[A-Za-z]:[\\\\\/]|\\\\\\\\|\/)/', $sslCa)) {
    $sslCa = $projectRoot . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $sslCa);
}

define('SSL_CA', $sslCa);
