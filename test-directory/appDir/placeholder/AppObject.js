var AppObject = (function () {
    function AppObject() {
    }
    AppObject.prototype.function = function (canvas) {
        var ctxt = canvas.getContext("2d");
        ctxt.fillStyle("red");
        ctxt.fillRect(0, 0, 100, 50);
    };
    return AppObject;
})();
//# sourceMappingURL=AppObject.js.map