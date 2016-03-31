/**
 * Created by sgsvenkatesh on 4/1/16.
 */

(function ($, global) {
    $.fn.extend({
        multiples: function (selector, multiple) {
            if (!selector || !multiple || multiple !== parseInt(multiple, 10)) {
                throw "Invalid argument multiple";
            }

            function hideRemainderElements ($that, selector, multiple) {
                var listElements = $that.find(selector);
                var remainder = listElements.length % multiple;
                while (remainder) {
                    listElements.eq(listElements.length - remainder).hide();
                    remainder--;
                }
            }

            hideRemainderElements($(this), selector, multiple);

            $(global).on("resize", function () {
                // take input for resize events
            });
        }
    });
}(jQuery, window));
