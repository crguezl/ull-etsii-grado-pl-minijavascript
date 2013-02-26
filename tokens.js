"use strict";
// tokens.js
// 2010-02-23

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments are ignored.

String.prototype.tokens = function () {
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var n;                      // The number value.
    var str;                    // The string value.
    var m;                      // Matching
    var rest = this.substr(i);  // The substring suffix to be processed
    var result = [];            // An array to hold the results.

    var WHITES              = /^\s+/;
    var ID                  = /^[a-zA-Z_]\w*/;
    var NUM                 = /^\d+(\.\d*)?([eE][+-]?\d+)?\b/;
    var STRING              = /^('(\\.|[^'])*'|"(\\.|[^"])*")/;
    var ONELINECOMMENT      = /^\/\/.*/;
    var MULTIPLELINECOMMENT = /^\/[*](.|\n)*?[*]\//;
    var TWOCHAROPERATORS    = /^([+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/;
    var ONECHAROPERATORS    = /^([-+*\/=()&|;:<>[\]])/;

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
        if (m = rest.match(WHITES)) {
            str = m[0];
            i += str.length;
        // name.
        } else if (m = rest.match(ID)) {
            str = m[0];
            i += str.length;
            result.push(make('name', str));

        // number.
        } else if (m = rest.match(NUM)) {
            str = m[0];
            i += str.length;

            n = +str;
            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', str).error("Bad number");
            }
        // string
        } else if (m = rest.match(STRING)) {
            str = m[0];
            i += str.length;
            str = str.replace(/^["']/,'');
            str = str.replace(/["']$/,'');
            result.push(make('string', str));
        // comment.
        } else if ((m = rest.match(ONELINECOMMENT))  || 
                   (m = rest.match(MULTIPLELINECOMMENT))) {
            str = m[0];
            i += str.length;
        // two char operator
        } else if (m = this.substr(i,2).match(TWOCHAROPERATORS)) {
            str = m[0];
            i += str.length;
            result.push(make('operator', str));
        // single-character operator
        } else if (m = this.substr(i,1).match(ONECHAROPERATORS)){
            result.push(make('operator', this.substr(i,1)));
            i += 1;
        } else {
          throw "syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

