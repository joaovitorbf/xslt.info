var xmleditor = ace.edit("xmlinput");
xmleditor.setTheme("ace/theme/monokai");
xmleditor.session.setMode("ace/mode/xml");

var outputeditor = ace.edit("xmloutput");
outputeditor.setTheme("ace/theme/monokai");
outputeditor.session.setMode("ace/mode/xml");

var xslteditor = ace.edit("xsltinput");
xslteditor.setTheme("ace/theme/monokai");
xslteditor.session.setMode("ace/mode/xml");

window.transform = function() {
}