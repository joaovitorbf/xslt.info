var xmleditor = ace.edit("xmlinput");
xmleditor.setTheme("ace/theme/monokai");
xmleditor.session.setMode("ace/mode/xml");

var outputeditor = ace.edit("xmloutput");
outputeditor.setTheme("ace/theme/monokai");
outputeditor.session.setMode("ace/mode/xml");

var xslteditor = ace.edit("xsltinput");
xslteditor.setTheme("ace/theme/monokai");
xslteditor.session.setMode("ace/mode/xml");

var loader = new ldloader({ root: ".ldld.full" })

function errorToast(msg) {
    Toastify({
        text: `Error: "${msg}"`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#f92672",
            color: "#272822"
        },
    }).showToast();
}

function transform() {
    loader.on()
    outputeditor.setValue('')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("xml", xmleditor.getValue());
    urlencoded.append("xslt", xslteditor.getValue());

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("/transform", requestOptions)
        .then((res) => {
            if (res.status != 200) {
                res.text().then((text) => {
                    errorToast(text)
                })
            }
            else {
                res.text().then((text) => {
                    SaxonJS.transform({
                        "stylesheetText": text,
                        "sourceText": xmleditor.getValue(),
                        "destination": "serialized"
                    }, "async")
                    .then((final) => {
                        outputeditor.setValue(final.principalResult)
                    })
                    .catch((e) => {
                        errorToast(e.message)
                    })
                }).catch((e) => {
                    errorToast(e.message)
                })
            }
            loader.off()
        })
        .catch((err) => {
            errorToast('Backend server connection error.')
            loader.off()
        })
}

function discord() {
    Toastify({
        text: `jvbf#0001`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#7289da",
            color: "	#ffffff"
        },
    }).showToast();
}