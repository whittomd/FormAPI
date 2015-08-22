define(['../form'], function (Form) {

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
});

