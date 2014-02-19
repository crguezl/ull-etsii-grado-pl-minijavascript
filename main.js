/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Transform a token object into an exception object and throw it.

Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

function main() {
    var parse = make_parse();


    var source = INPUT.value;
    var string, tree;
    try {
        tree = parse(source);
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

window.onload = function() {
  PARSE.onclick = main;

  $("#examples").change(function(ev) {
      var file = this.options[this.selectedIndex].value;
      $.get("http://crguezl.github.io/ull-etsii-grado-pl-minijavascript/"+file, function (data) {
              $("#INPUT").val(data);
          });
  });

}

/*
$(document).ready(function () {
    $("#process_btn").click(processGrammar);
    $("#parse_btn").click(runParser);

    $("#examples").change(function(ev) {
        var file = this.options[this.selectedIndex].value;
        $(document.body).addClass("loading");
        $.get("/jison/examples/"+file, function (data) {
                $("#grammar").val(data);
                $(document.body).removeClass("loading");
            });
    });

});
*/
