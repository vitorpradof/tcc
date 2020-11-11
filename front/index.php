<?php

if (PHP_SAPI == 'cli-server') {
  // To help the built-in PHP dev server, check if the request was actually for
  // something which should probably be served as a static file
  $url  = parse_url($_SERVER['REQUEST_URI']);
  $file = __DIR__ . $url['path'];
  if (is_file($file)) {
    return false;
  }
}

require __DIR__ . '/vendor/autoload.php';

ini_set('max_execution_time', 18000);
date_default_timezone_set('America/Sao_Paulo');
set_time_limit(0);

session_start();

// Instantiate the app
$settings = require __DIR__ . '/src/settings.php';
$app = new \Slim\App($settings);

// Set bootstrap
require __DIR__ . '/src/bootstrap.php';

// Views
require __DIR__ . '/src/views.php';

// Register routes
require __DIR__ . '/src/routes.php';

// Run app
$app->run();
