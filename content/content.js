
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var json_box = document.getElementById('json_text');

        var count_key = 0;
        var count_value = 0;

        const type_obj =
        {
            string: 0,
            number: 0,
            object: 0,
            boolean: 0,
        }

        json_box.innerHTML = JSON.stringify(request, undefined, 2);
        JSON.parse(json_box.innerHTML, (key, value) => {
            if (key && json_box.innerHTML.indexOf("\"" + key + "\"") > -1) {
                count_key++;
                count_value++;

                switch (typeof (value)) {
                    case "string":
                        type_obj["string"]++;
                        break;
                    case "number":
                        type_obj["number"]++;
                        break;
                    case "object":
                        type_obj["object"]++;
                        break;
                        case "boolean":
                        type_obj["boolean"]++;
                        break;
                }

                document.getElementById('json_text')
            }
        });

        document.getElementById('json_info').innerHTML = "Key:" + count_key + ", Value:" + count_value;
        document.getElementById('type_info').innerHTML = "Type of value: { " + "string: " + type_obj["string"] + ", number: " + type_obj["number"] + ", object: " + type_obj["object"] + ", boolean: " + type_obj["boolean"] + " }";
    }
);

chrome.runtime.sendMessage({ msg: "created" });



