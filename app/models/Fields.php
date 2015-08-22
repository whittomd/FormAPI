<?php

class Fields extends RestModel {
    
    protected $formId;
    protected $revisionId;
    protected $delta;
    protected $parent;
    protected $FieldType;
    
    public function initialize() {
        $this->belongsTo(array('formId', 'revisionId'), "Forms", array('formId', 'revisionId'));
    }
}

