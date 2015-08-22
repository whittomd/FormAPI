

requirejs(['form', 'util', 'elements'],
        function (form, util) {
            var formData = {
                parent: jQuery('.canvas'),
                elements: [
                ]
            };
            //jQuery, canvas and the app/sub module are all
            //loaded and can be used here now.
        util.generate(formData);
});