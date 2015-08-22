<?php

class Forms extends RestModel {

    protected $formId;
    protected $revisionId;
    protected $relationships = array(
        'fields'
    );

    public function initialize() {
        $this->hasOne(array('formId', 'revisionId'), 'FormsRevision', array('formId', 'revisionId'));
        $this->hasMany(array('formId', 'revisionId'), "Fields", array('formId', 'revisionId'));
    }

    public function postInsert() {
        
    }

    public function preUpdate() {
        $formsRevision = new FormsRevision();

        $formsRevision->assign(array(
            'formId' => $this->formId
        ));
        
        $formsRevision->save();
        $this->revisionId = $formsRevision->revisionId;
    }

}
