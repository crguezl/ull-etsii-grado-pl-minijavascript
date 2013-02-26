// tokens.js
// 2010-02-23

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments are ignored.

String.prototype.tokens = function (prefix, suffix) {
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var n;                      // The number value.
    var q;                      // The quote character.
    var str;                    // The string value.
    var m;                      // Matching
    var rest = this.substr(i);  // The substring suffix to be processed

    var result = [];            // An array to hold the results.

    // Make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this) return; 

    // Loop through this text
    while (rest = this.substr(i)) {
        from = i;
        // Ignore whitespace.
        if (m = rest.match(/^\s+/)) {
            str = m[0];
            i += str.length;
        // name.
        } else if (m = rest.match(/^[a-zA-Z_]\w*/)) {
            str = m[0];
            i += str.length;
            result.push(make('name', str));

        // number.
        // A number cannot start with a decimal point. It must start with a digit,
        // possibly '0'.
        } else if (m = rest.match(/^\d+(\.\d*)?([eE][+-]?\d+)?\b/)) {
            str = m[0];
            i += str.length;

            n = +str;
            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', str).error("Bad number");
            }
        // string
        } else if (m = rest.match(/^('(\\.|[^'])*'|"(\\.|[^"])*")/)) {
            str = m[0];
            i += str.length;
            str = str.replace(/^["']/,'');
            str = str.replace(/["']$/,'');
            result.push(make('string', str));
        // comment.
        } else if ((m = rest.match(/^\/\/.*/))  || 
                   (m = rest.match(/^\/[*](.|\n)*?[*]\//))) {
            str = m[0];
            i += str.length;
        // source.tokens('=<>!+-*&|/%^', '=<>&|');
        // combining
        } else if (m = this.substr(i,2).match(/^([+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/)) {
            str = m[0];
            i += str.length;
            result.push(make('operator', str));
        // single-character operator
        } else if (m = this.substr(i,1).match(/^([-+*\/=()&|;:<>[\]])/)){
            result.push(make('operator', this.substr(i,1)));
            i += 1;
        } else {
          throw "syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

