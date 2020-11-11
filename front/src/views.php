<?php

// Get container
use Slim\Http\Environment;
use Slim\Http\Uri;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;

$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
  $view = new Twig([
    __DIR__ . '/../content/forms/layout'
  ], [
    'cache' => false
  ]);

  // Instantiate and add Slim specific extension
  $router = $container->get('router');
  $uri = Uri::createFromEnvironment(new Environment($_SERVER));
  $view->addExtension(new TwigExtension($router, $uri));

  return $view;
};
