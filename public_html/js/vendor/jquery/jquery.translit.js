/*!
 * jQuery Translit Plugin v0.1.4
 * www.github.com/borodean/jquery-translit
 *
 * (c) Vadim Borodean, 2012
 * (c) Artem Kariavka, 2014
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */

/*global jQuery */

(function ($) {

    'use strict';

    var dictionary, methods;

    /*
     Based on GOST 7.79-2000
     http://transliteration.ru/gost-7-79-2000/
     */

    dictionary = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'ґ': 'g',
        'д': 'd',
        'е': 'e',
        'є': 'ye',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'і': 'i',
        'ї': 'yi',
        'й': 'j',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'x',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'shh',
        'ъ': '``',
        'ы': 'y`',
        'ь': '`',
        'э': 'e`',
        'ю': 'yu',
        'я': 'ya'
    };

    methods = {
        init: function () {
            return this.each(function () {
                $(this).val($.transliterate($(this).val()));
            });
        },
        receive: function (target) {
            return $(this).val($.transliterate($(target).val()));
        },
        send: function (target) {
            return $(target).val($.transliterate($(this).val()));
        },
        watch: function (target, unwatchOnChange) {
            return this.each(function () {
                var data, that;
                data = $(this).data('targets.translit');
                that = this;
                $(this).data('targets.translit', $(data).add(target));
                $(target).on('change.translit input.translit keyup.translit propertychange.translit', function () {
                    $(this).translit('send', that);
                });
                if (unwatchOnChange) {
                    $(this).on('change.translit', function () {
                        $(this).translit('unwatch');
                    });
                }
            });
        },
        unwatch: function () {
            return this.each(function () {
                $($(this).data('targets.translit')).off('.translit');
                $(this).removeData('targets.translit');
            });
        }
    };

    $.fn.translit = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method ' + method + ' does not exist on jQuery.translit');
    };

    $.transliterate = function (string) {
        return string.replace(/([а-яёіїєґ])/gi, function (matchResult) {
            var matchResultLowerCase, replaceValue;
            matchResultLowerCase = matchResult.toLowerCase();
            replaceValue = dictionary[matchResultLowerCase];
            if (typeof replaceValue === 'undefined') {
                return matchResult;
            }
            if (matchResultLowerCase === matchResult) {
                return replaceValue;
            }
            return replaceValue.substring(0, 1).toUpperCase() +
                replaceValue.substring(1);
        });
    };

}(jQuery));