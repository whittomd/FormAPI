define(
    ['form', 'util'],
    function (Form, util) {
        Form.elements.Element = function (parent, properties) {
            var defaults = {
            }
            this.parent = parent;

            jQuery.extend(this, defaults, properties);
        }
        Form.elements.Element.prototype = {
            render: function () {
                return util.render(this.parent, this.properties);
            }
        }
        require(['elements/panel']);
        require(['elements/textfield']);
        require(['elements/textarea']);
    }
);