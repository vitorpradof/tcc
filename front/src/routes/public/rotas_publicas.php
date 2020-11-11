<?php

use Slim\Views\Twig;

$app->get('/registro', function ($request, $response, $args) {
  $view = new Twig([
    __DIR__ . '/../../../content/public/layout',
    __DIR__ . '/../../../content/public/view'
  ], [
    'cache' => false
  ]);
  return $view->render($response, 'layout.html', [
    'titulo' => 'Registrar',
    'pagina' => 'registro.html'
  ]);
});

