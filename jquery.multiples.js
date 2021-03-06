(function ($, global) {
    $.fn.extend({
        multiples: function (selector, multipleRules) {
            if (!selector || !multipleRules || multipleRules.length === 0) {
                throw "Invalid arguments";
            }

            var $that = $(this);

            multipleRules.sort(function (ruleA, ruleB) {
                ruleA.width = parseInt(ruleA.width, 10);
                ruleB.width = parseInt(ruleB.width, 10);
                if (isNaN(ruleA.width) || isNaN(ruleB.width)) {
                    throw "Invalid width";
                }
                if (ruleA.width < ruleB.width) {
                    return -1;
                } else if (ruleA.width > ruleB.width) {
                    return 1;
                } else {
                    throw "Duplicate rule width";
                }
            });

            function hideRemainderElements ($that, selector, multiples) {
                var listElements = $that.find(selector);
                var remainder = listElements.length % multiples;
                $that.find(selector + ":hidden").each(function () {
                    if (listElements.length - $(this).index() > remainder) {
                        $(this).show();
                    }
                });
                while (remainder) {
                    listElements.eq(listElements.length - remainder).hide();
                    remainder--;
                }
            }

            function getActiveRule (multipleRules, global) {
                return multipleRules.find(function (rule) {
                    return global.innerWidth < rule.width;
                });
            }

            hideRemainderElements($that, selector, getActiveRule(multipleRules, global).multiples);

            $(global).on("resize.multiples", function () {
                hideRemainderElements($that, selector, getActiveRule(multipleRules, global).multiples);
            });

            return {
                destroy: function () {
                    $(global).off("resize.multiples");
                    $that.find(selector + ":hidden").show();
                }
            }
        }
    });
}(jQuery, window));