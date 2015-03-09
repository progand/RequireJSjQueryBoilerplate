require.config({    
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the ".js" file extension. 
        "jquery": "vendor/jquery",
        "jquery-ui": "vendor/jquery-ui",
        "lodash": "vendor/lodash",
        "bootstrap": "vendor/bootstrap",
        "jquery.translit": "vendor/jquery/jquery.translit"
    },
    shim: {
        "jquery": [],
        "lodash": {
            exports: "_"
        },
        // Twitter Bootstrap jQuery plugins
        "bootstrap": ["jquery"],
        // jQueryUI
        "jquery-ui": ["jquery"],
        "jquery.translit": ["jquery"]
    }
});

define([
    "jquery",
    "lodash",
    "helper/heading",
    "jquery-ui",
    "bootstrap",
    "jquery.translit"
],
        function ($, _, heading, ui, bootstrap, translit) {
            $("h1").text($.transliterate(heading))
                    .effect("highlight");
        });
