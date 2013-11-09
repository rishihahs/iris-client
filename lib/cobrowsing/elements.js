define(['jquery'], function($) {
    var elements = {};

    elements.ignoreElement = function ignoreElement(el) {
        if (el instanceof $) {
            el = el[0];
        }
        while (el) {
            if ($(el).prop('class') && $(el).prop('class').indexOf('iris') >= 0) {
                return true;
            }
            el = el.parentNode;
        }
        return false;
    };

    elements.elementLocation = function elementLocation(el) {
        if (el instanceof $) {
            // a jQuery element
            el = el[0];
        }
        if (el[0] && el[0].nodeType == 1) {
            // Or a jQuery element not made by us
            el = el[0];
        }
        if (el.id) {
            return "#" + el.id;
        }
        if (el.tagName == "BODY") {
            return "body";
        }
        if (el.tagName == "HEAD") {
            return "head";
        }
        if (el === document) {
            return "document";
        }
        var parent = el.parentNode;
        if (!parent) {
            console.warn("elementLocation(", el, ") has null parent");
            throw "No locatable parent found";
        }
        var parentLocation = elementLocation(parent);
        var children = parent.childNodes;
        var index = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == el) {
                break;
            }
            if (children[i].nodeType == document.ELEMENT_NODE) {
                if (children[i].className.indexOf("iris") != -1) {
                    // Don't count our UI
                    continue;
                }
                // Don't count text or comments
                index++;
            }
        }
        return parentLocation + ":nth-child(" + (index + 1) + ")";
    };

    elements.CannotFind = function CannotFind(location, reason, context) {
        this.prefix = "";
        this.location = location;
        this.reason = reason;
        this.context = context;
    };

    elements.CannotFind.prototype.toString = function() {
        var loc;
        try {
            loc = elements.elementLocation(this.context);
        } catch (e) {
            loc = this.context;
        }
        return (
            "[CannotFind " + this.prefix +
            "(" + this.location + "): " +
            this.reason + " in " +
            loc + "]");
    };

    elements.findElement = function findElement(loc, container) {
        container = container || document;
        var el, rest;
        if (loc === "body") {
            return document.body;
        } else if (loc === "head") {
            return document.head;
        } else if (loc === "document") {
            return document;
        } else if (loc.indexOf("body") === 0) {
            el = document.body;
            try {
                return findElement(loc.substr(("body").length), el);
            } catch (e) {
                if (e instanceof elements.CannotFind) {
                    e.prefix = "body" + e.prefix;
                }
                throw e;
            }
        } else if (loc.indexOf("head") === 0) {
            el = document.head;
            try {
                return findElement(loc.substr(("head").length), el);
            } catch (e) {
                if (e instanceof elements.CannotFind) {
                    e.prefix = "head" + e.prefix;
                }
                throw e;
            }
        } else if (loc.indexOf("#") === 0) {
            var id;
            loc = loc.substr(1);
            if (loc.indexOf(":") === -1) {
                id = loc;
                rest = "";
            } else {
                id = loc.substr(0, loc.indexOf(":"));
                rest = loc.substr(loc.indexOf(":"));
            }
            el = document.getElementById(id);
            if (!el) {
                throw elements.CannotFind("#" + id, "No element by that id", container);
            }
            if (rest) {
                try {
                    return findElement(rest, el);
                } catch (e) {
                    if (e instanceof elements.CannotFind) {
                        e.prefix = "#" + id + e.prefix;
                    }
                    throw e;
                }
            } else {
                return el;
            }
        } else if (loc.indexOf(":nth-child(") === 0) {
            loc = loc.substr((":nth-child(").length);
            if (loc.indexOf(")") == -1) {
                throw "Invalid location, missing ): " + loc;
            }
            var num = loc.substr(0, loc.indexOf(")"));
            num = parseInt(num, 10);
            var count = num;
            loc = loc.substr(loc.indexOf(")") + 1);
            var children = container.childNodes;
            el = null;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.nodeType == document.ELEMENT_NODE) {
                    if (child.className.indexOf("iris") != -1) {
                        continue;
                    }
                    count--;
                    if (count === 0) {
                        // this is the element
                        el = child;
                        break;
                    }
                }
            }
            if (!el) {
                throw elements.CannotFind(":nth-child(" + num + ")", "container only has " + (num - count) + " elements", container);
            }
            if (loc) {
                try {
                    return elements.findElement(loc, el);
                } catch (e) {
                    if (e instanceof elements.CannotFind) {
                        e.prefix = ":nth-child(" + num + ")" + e.prefix;
                    }
                    throw e;
                }
            } else {
                return el;
            }
        } else {
            throw elements.CannotFind(loc, "Malformed location", container);
        }
    };

    elements.elementByPixel = function(height) {
        /* Returns {location: "...", offset: pixels}

       To get the pixel position back, you'd do:
         $(location).offset().top + offset
     */

        function search(start, height) {
            var last = null;
            var children = start.children();
            children.each(function() {
                var el = $(this);
                if (el.attr('class').indexOf('iris') >= 0 || el.css("position") == "fixed" || !el.is(":visible")) {
                    return;
                }
                if (el.offset().top > height) {
                    return false;
                }
                last = el;
            });
            if ((!children.length) || (!last)) {
                // There are no children, or only inapplicable children
                return {
                    location: elements.elementLocation(start[0]),
                    offset: height - start.offset().top,
                    absoluteTop: height,
                    documentHeight: $(document).height()
                };
            }
            return search(last, height);
        }
        return search($(document.body), height);
    };

    elements.pixelForPosition = function(position) {
        /* Inverse of elements.elementByPixel */
        if (position.location == "body") {
            return position.offset;
        }
        var el;
        try {
            el = elements.findElement(position.location);
        } catch (e) {
            if (e instanceof elements.CannotFind && position.absoluteTop) {
                // We don't trust absoluteTop to be quite right locally, so we adjust
                // for the total document height differences:
                var percent = position.absoluteTop / position.documentHeight;
                return $(document).height() * percent;
            }
            throw e;
        }
        var top = $(el).offset().top;
        // FIXME: maybe here we should test for sanity, like if an element is
        // hidden.  We can use position.absoluteTop to get a sense of where the
        // element roughly should be.  If the sanity check failed we'd use
        // absoluteTop
        return top + position.offset;
    };

    return elements;

});