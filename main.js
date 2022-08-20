var xmleditor = ace.edit("xmlinput");
xmleditor.setTheme("ace/theme/monokai");
xmleditor.session.setMode("ace/mode/xml");

var outputeditor = ace.edit("xmloutput");
outputeditor.setTheme("ace/theme/monokai");
outputeditor.session.setMode("ace/mode/xml");

var xslteditor = ace.edit("xsltinput");
xslteditor.setTheme("ace/theme/monokai");
xslteditor.session.setMode("ace/mode/xml");

window.transform = function () {
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
            if (res.status == 400) {
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
        })
}