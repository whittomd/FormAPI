<?php

abstract class RestModel extends \Phalcon\Mvc\Model
{
    public function toArray() {
        $properties = get_object_vars($this);
        if(!empty($this->relationships)) {
            foreach($this->relationships as $relationship) {
                $relationshipData = $this->$relationship;
                foreach($relationshipData as $relationshipItem) {
                    $properties[$relationship][] = $relationshipItem->toArray();
                }
            }
            unset($properties['relationships']);
        }
        
        return array_diff_key($properties, get_class_vars('\Phalcon\Mvc\Model'));
    }
}