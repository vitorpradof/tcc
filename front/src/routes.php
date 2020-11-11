<?php

use GuzzleHttp\Client;
use Slim\Container;
use Slim\Views\Twig;

$c = new Container();
unset($app->getContainer()['notFoundHandler']);
$app->getContainer()['notFoundHandler'] = function ($c) {
  return function ($request, $response) use ($c) {
    $view = new Twig([
      __DIR__ . '/../content/admin/layout',
      __DIR__ . '/../content/admin/view'
    ], [
      'cache' => false
    ]);
    return $view->render($response, 'layoutAdmin.html', [
      'pagina'  => 'notFound.html'
    ]);
  };
};

// Rotas do cliente
require __DIR__ . '/routes/admin/rotas_cliente.php';
require __DIR__ . '/routes/public/rotas_publicas.php';

$app->get('/', function ($request, $response, $args) {
  return $response->withRedirect($this->router->pathFor('admin.home'));
});
