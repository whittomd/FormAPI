<?php

class FormDesignerController extends \Phalcon\MVC\Controller {
    
    public function onConstruct() {
        //Add some local CSS resources
        $this->assets
            ->addCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', false)
            ->addCss('css/formdesigner/form.css');

        //and some local javascript resources
        $this->assets
            ->addJs('//code.jquery.com/jquery-2.1.3.js', false)
            ->addJs('//code.jquery.com/ui/1.11.4/jquery-ui.js', false)
            ->addJs('js/require.min.js', true, false, array('data-main' => '/PhalconForms/js/formdesigner/main'));
            //->addJs('js/formdesigner/form.js');
    }
    public function indexAction() {
        
    }
}
