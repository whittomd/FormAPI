define(['../form'], function (Form) {
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
});


