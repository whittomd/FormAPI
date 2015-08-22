define(['../form'], function (Form) {


    Form.elements.Panel = function (parent, properties) {
        this.parent = parent;



        this.defaults = Form.settings.element_prototypes.Panel.properties;
        this.properties = jQuery.extend(true, {}, this.defaults, properties);
    };

    Form.elements.Panel.prototype = new Form.elements.Element();
    Form.settings.element_prototypes.Panel = {
        type: 'Panel',
        properties: {
            resizable: {
                minHeight: 150,
                minWidth: 300,
            },
            container: "droppable",
            tag: 'section',
            title: "Panel",
            attributes: {
                name: 'panel'
            }
        }
    };
});