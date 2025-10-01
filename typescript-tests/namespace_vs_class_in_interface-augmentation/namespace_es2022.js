export var Status;
(function (Status) {
    Status["Success"] = "success";
    Status["Partial"] = "partial";
    Status["NotFound"] = "not_found";
})(Status || (Status = {}));
export var IChapter;
(function (IChapter) {
    function wrapAsResponse(chapter) {
        let amountNull = 0, total = 0;
        for (const [translation, verses] of Object.entries(chapter))
            if (verses === null)
                amountNull++;
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
    }
    IChapter.wrapAsResponse = wrapAsResponse;
})(IChapter || (IChapter = {}));
