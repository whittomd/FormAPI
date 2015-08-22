define({elements: {}, settings: {elements: {}, element_prototypes: {}}});

var Form = Form || {elements: {}, settings: {elements: {}, element_prototypes: {}}};

Form.util = {
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    },
    render: function (parent, settings) {
        console.log(settings);
        var defaults = {
            tag: 'input',
            attributes: {
            },
            position: {
                type: 'absolute',
                top: null,
                left: null
            }
        }
        console.log(defaults);
        var element_settings = jQuery.extend(true, {}, defaults, settings)
        console.log(element_settings);
        var element = jQuery(document.createElement(element_settings.tag));

        jQuery.each(element_settings.attributes, function (attribute_name, attribute_value) {
            element.attr(attribute_name, attribute_value);
        });

        console.log(element[0]);
        // Position the element
        //jQuery.css(element_settings.position);
        console.log(parent);
        return element;
    },
    createElement: function (form, element) {
        console.log("Element Type: " + element.type);
        var form_element = new Form.elements[element.type](form, element.properties);

        console.log(form_element);
        var wrappedElement = Form.util.wrap(form_element, element);
        wrappedElement.data('prototype', element);
        if (element.guid) {
            wrappedElement.attr('guid', element.guid);
        }
        return wrappedElement;
    },
    createElementHelper: function (form, element) {
        var helperElement = jQuery.extend(true, {}, element);
        helperElement.properties.container = false;
        console.log("Element Type: " + helperElement.type);
        var form_element = new Form.elements[element.type](form, helperElement.properties);

        console.log(form_element);
        var wrappedElement = Form.util.wrap(form_element, helperElement);
        wrappedElement.data('prototype', element);
        if (helperElement.guid) {
            wrappedElement.attr('guid', helperElement.guid);
        }
        return wrappedElement;
    },
    generate: function (form_data) {
        // Create the form
        var form = jQuery('<form></form>');
        jQuery.each(form_data.elements, function (element_name, element) {

            var mergedElement = jQuery.extend({}, Form.settings.element_prototypes[element.type].properties, element);
            Form.util.addElement(form, form_data.parent, mergedElement);

        });

        form_data.parent.on('click', function (e) {
            Form.util.setSelectedElement('', e);
        });
        form.appendTo(form_data.parent);
    },
    addElement: function (form, parent, element) {
        var guid = Form.util.guid();
        Form.settings.elements[guid] = element;
        element.guid = guid;
        var wrappedElement = Form.util.createElement(form, element);
        wrappedElement.attr('guid', guid);
        if (element.properties.attributes.position) {
            //wrappedElement.css('top', element.properties.attributes.position.top);
            //wrappedElement.css('left', element.properties.attributes.position.left);
            //wrappedElement.css('position', 'absolute');
        }
        wrappedElement.appendTo(parent);
        Form.util.makeDraggable(parent, wrappedElement);
        Form.util.makeResizable(parent, wrappedElement, element);
    },
    wrap: function (form_element, element) {
        var element_properties = element.properties;
        var wrapper = jQuery('<div>');
        var label = jQuery('<label>');
        label.attr('for', element_properties.attributes.name);
        label.text(element_properties.title);
        wrapper.addClass('form-element');
        wrapper.addClass('form-element-' + element.type.toLowerCase());
        wrapper.on('mousedown click', function (e) {
            Form.util.setSelectedElement(this, e);

            e.stopPropagation();
        });
        wrapper.append(label);
        var renderedFormElement = form_element.render();
        if (element.properties.container === 'droppable') {
            renderedFormElement.droppable(
                    {
                        hoverClass: "drop-hover",
                        greedy: true,
                        drop: function (event, ui) {
                            console.log(event);
                            console.log("Dropped: " + this);
                            console.log(ui);
                            console.log(this);

                            var offsetLeft = ui.helper.offset().left - jQuery(this).offset().left;
                            var offsetTop = ui.helper.offset().top - jQuery(this).offset().top;
                            console.log("helper offsetLeft: " + offsetLeft);
                            console.log("helper offsetTop: " + offsetTop);
                            var prototype = ui.helper.data('prototype');
                            console.log(prototype);
                            prototype.properties.attributes.position = {top: offsetTop, left: offsetLeft};
                            Form.util.addElement(jQuery('form'), this, prototype);
                            ui.helper.remove();
                        }

                    }
            );
        } else if (element.properties.container === 'sortable') {
            renderedFormElement.sortable();
        }
        console.log("form element");
        console.log(form_element);
        
        wrapper.append(renderedFormElement);
        return wrapper;
    },
    makeDraggable: function (parent, element) {
        jQuery(element).draggable({containment: jQuery('.canvas'), revert: "invalid", connectToSortable: '.ui-sortable'});
    },
    makeResizable: function (parent, wrappedElement, element) {
        console.log('makeResizable');
        console.log(element);
        var renderedFormElement = jQuery(element.properties.tag, wrappedElement);
        if(element.properties.resizable) {
            var droppableParent = renderedFormElement.parents('.ui-droppable').first();
            console.log("parents");
            console.log(droppableParent);
            var resizableProperties = {
                containment: droppableParent,
                alsoResize: wrappedElement
            }
            if(typeof element.properties.resizable === 'object') {
                resizableProperties = jQuery.extend(resizableProperties, element.properties.resizable);
                renderedFormElement.height(resizableProperties.minHeight-8);
            }
            renderedFormElement.resizable(resizableProperties);
        }
    },
    setSelectedElement: function (form_element, event) {
        console.log(event.shiftKey);


        jQuery('.form-element').not(jQuery(form_element)).removeClass('selected');
        if (jQuery(form_element).length > 0) {
            jQuery(form_element).addClass('selected');
            //Form.util.selectedElements.push(jQuery(form_element));
        }
    }
}
Form.elements.Element = function (parent, properties) {
    var defaults = {
    }
    this.parent = parent;

    jQuery.extend(this, defaults, properties);
}

Form.elements.Element.prototype = {
    render: function () {
        return Form.util.render(this.parent, this.properties);
    }
}


Form.elements.TextArea = function (parent, properties) {
    this.parent = parent;
    this.defaults = Form.settings.element_prototypes.TextArea.properties;
    this.properties = jQuery.extend(true, {}, this.defaults, properties);
};

Form.elements.TextArea.prototype = new Form.elements.Element();
Form.settings.element_prototypes.TextArea = {
    type: 'TextArea',
    properties: {
        tag: 'textarea',
        container: false,
        title: "TextArea",
        attributes: {
            name: 'textarea'
        }
    }
};

Form.elements.TextField = function (parent, properties) {
    this.parent = parent;
    this.defaults = Form.settings.element_prototypes.TextArea.properties;
    this.properties = jQuery.extend(true, {}, this.defaults, properties);
};

Form.elements.TextField.prototype = new Form.elements.Element();
Form.settings.element_prototypes.TextField = {
    type: 'TextField',
    properties: {
        resizable: {
            maxHeight: 30,
            minHeight: 30,
            minWidth: 100,
        },
        tag: 'input',
        container: false,
        title: "TextField",
        attributes: {
            type: 'text',
            name: 'textarea'
        }
    }
};




var formData = {
    parent: jQuery('.canvas'),
    elements: [
    ]
};




jQuery(document).ready(function () {
    
    jQuery('.draggable').draggable({
        helper: function () {
            var type = jQuery(this).attr('type');
            /*var prototype = {
             type: type,
             properties: {
             title: "TextArea",
             attributes: {
             name: 'textarea'
             }
             }
             };*/

            var prototype = Form.settings.element_prototypes[type];
            console.log('Begin Prototype');
            console.log(prototype);
            console.log('End Prototype');
            var helper = Form.util.createElementHelper(jQuery('form'), prototype);
            helper.addClass('ui-helper');
            console.log(helper);
            helper.data('new-element', true);
            return helper;
        }
    });

    jQuery('form').droppable({
        hoverClass: "drop-hover",
        drop: function (event, ui) {

            var offsetLeft = ui.helper.position().left - jQuery(this).position().left;
            var offsetTop = ui.helper.position().top - jQuery(this).position().top;
            console.log("thisLeft: " + jQuery(this).position().left);
            console.log("thisTop: " + jQuery(this).position().top);
            console.log("offsetLeft: " + offsetLeft);
                            console.log("offsetTop: " + offsetTop);
            console.log('New-element: ' + ui.helper.data('new-element'));
            if (ui.helper.data('new-element')) {
                var prototype = ui.helper.data('prototype');
                prototype.properties.attributes.position = {top: offsetTop, left: offsetLeft};
                Form.util.addElement(jQuery('form'), this, prototype);
                ui.helper.remove();
            }

        }
    }

    );
});



