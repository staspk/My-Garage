"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IChapter = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Success"] = "success";
    Status["Partial"] = "partial";
    Status["NotFound"] = "not_found";
})(Status || (exports.Status = Status = {}));
var IChapter = /** @class */ (function () {
    function IChapter() {
    }
    IChapter.wrapAsResponse = function (chapter) {
        var amountNull = 0, total = 0;
        for (var _i = 0, _a = Object.entries(chapter); _i < _a.length; _i++) {
            var _b = _a[_i], translation = _b[0], verses = _b[1];
            if (verses === null)
                amountNull++;
        }
        total++;
        if (amountNull === 0) {
            return {
                status: Status.Success,
                data: chapter
            };
        }
        else if (total === amountNull) {
            return {
                status: Status.NotFound,
                data: chapter
            };
        }
        else {
            return {
                status: Status.Partial,
                data: chapter
            };
        }
    };
    return IChapter;
}());
exports.IChapter = IChapter;
