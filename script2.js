$("#searchBtn").on("click", function () {

    var newData = $("#searchBox").val();
    save();
    function save() {

        // if there's nothing saved then save an empty array
        if (localStorage.getItem("data") == null) {
            localStorage.setItem("data", "[]");
        }
        // get old data and add it to the new data
        var oldData = JSON.parse(localStorage.getItem("data"));
        oldData.push(newData);
        localStorage.setItem("data", JSON.stringify(oldData));
        var savedData = localStorage.getItem("data");

        if (savedData != null) {
            var parseData = JSON.parse(savedData);
            var history = $("#history");
            history.empty();
            for (i = 0; i < parseData.length; i++) {
               
                var output = $("<div>").text(parseData[i]);
                history.append(output);


            }


        }
    }
})