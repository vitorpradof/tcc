<?php

use Slim\Views\Twig;

$app->group('/admin', function () use ($app) {

  $app->get('/login', function ($request, $response, $args) {
    $view = new Twig([
      __DIR__ . '/../../../content/admin/layout',
      __DIR__ . '/../../../content/admin/view'
    ], [
      'cache' => false
    ]);
    return $view->render($response, 'layoutLogin.html', [
      'titulo' => 'Login',
      'pagina' => 'loginColaborativo.html'
    ]);
  });

  $app->get('/home', function ($request, $response, $args) {
    $view = new Twig([
      __DIR__ . '/../../../content/admin/layout',
      __DIR__ . '/../../../content/admin/view'
    ], [
      'cache' => false
    ]);
    return $view->render($response, 'layoutAdmin.html', [
      'titulo' => 'Home',
      'pagina' => 'home.html'
    ]);
  })->setName('admin.home');

  $app->get('/servicos', function ($request, $response, $args) {
    $view = new Twig([
      __DIR__ . '/../../../content/admin/layout',
      __DIR__ . '/../../../content/admin/view'
    ], [
      'cache' => false
    ]);
    return $view->render($response, 'layoutAdmin.html', [
      'titulo' => 'Serviços',
      'pagina' => 'servicos.html'
    ]);
  });

  $app->get('/meus-dados', function ($request, $response, $args) {
    $view = new Twig([
      __DIR__ . '/../../../content/admin/layout',
      __DIR__ . '/../../../content/admin/view'
    ], [
      'cache' => false
    ]);
    return $view->render($response, 'layoutAdmin.html', [
      'titulo' => 'Meus dados',
      'pagina' => 'meusDados.html'
    ]);
  });
});
