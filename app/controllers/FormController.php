<?php

class FormController extends \Phalcon\Mvc\Controller {

    public function indexAction() {
        $form = Forms::findFirst(1);
        print_r($form->toArray());
    }

    public function registerAction() {

        $user = new Users();

        //Store and check for errors
        $success = $user->save($this->request->getPost(), array('name', 'email'));

        if ($success) {
            echo "Thanks for registering!";
        } else {
            echo "Sorry, the following problems were generated: ";
            foreach ($user->getMessages() as $message) {
                echo $message->getMessage(), "<br/>";
            }
        }

        $this->view->disable();
    }

}
