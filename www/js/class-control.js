HTMLElement.prototype.addClass = function (className) {
    this.className += " " + className;
};

HTMLElement.prototype.removeClass = function (className) {
    var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    this.className = this.className.replace(check, " ").trim();
};

HTMLElement.prototype.toggleClass = function (className) {
    var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(this.className)) {
        this.className = this.className.replace(check, " ").trim();
    } else {
        this.className += " " + className;
    }
};

HTMLElement.prototype.hasClass = function (className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.className);
};
