<?php

//Create a DI
$di = new Phalcon\DI\FactoryDefault();

$di->set('assets', function () {
    return new Phalcon\Assets\Manager();
}, true);
//Setup the database service
$di->set('db', function() {
    return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
        "host" => "localhost",
        "username" => "phalconform",
        "password" => "Grffe3bnGJsz4sG3",
        "dbname" => "phalconform"
    ));
});

//Setup the view component
$di->set('view', function() {
    $view = new \Phalcon\Mvc\View();
    $view->setViewsDir('../app/views/');
    return $view;
});

//Setup a base URI so that all generated URIs include the "tutorial" folder
$di->set('url', function() {
    $url = new \Phalcon\Mvc\Url();
    $url->setBaseUri('/PhalconForms/');
    return $url;
});

/**
 * Start the session the first time some component request the session service
 */
$di->set('session', function() {
	$session = new SessionAdapter();
	$session->start();
	return $session;
});

/**
 * Register the flash service with custom CSS classes
 */
$di->set('flash', function(){
	return new FlashSession(array(
		'error'   => 'alert alert-danger',
		'success' => 'alert alert-success',
		'notice'  => 'alert alert-info',
	));
});
