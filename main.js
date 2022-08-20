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

    fetch("http://127.0.0.1:8080/transform", requestOptions)
        .then((res) => {
            if (res.status != 200) {
                res.text().then((text) => {
                    Toastify({
                        text: `Error: "${text}"`,
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
                })
            }
            else {
                res.text().then((text) => {
                    outputeditor.setValue(text)
                })
            }
            loader.off()
        })
        .catch((err) => {
            Toastify({
                text: `Backend server connection error.`,
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