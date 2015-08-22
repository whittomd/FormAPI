<?php

try {

    //Register an autoloader
    $loader = new \Phalcon\Loader();
    $loader->registerDirs(array(
        '../app/controllers/',
        '../app/models/'
    ))->register();

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

    //Handle the request
    $application = new \Phalcon\Mvc\Application($di);

    echo $application->handle()->getContent();
} catch (\Phalcon\Exception $e) {
    echo "PhalconException: ", $e->getMessage();
}