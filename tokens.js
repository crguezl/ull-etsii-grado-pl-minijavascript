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
    var m;                      // Matching
    var result = [];            // An array to hold the results.

    var WHITES              = /\s+/y;
    var ID                  = /[a-zA-Z_]\w*/y;
    var NUM                 = /\d+(\.\d*)?([eE][+-]?\d+)?/y;
    var STRING              = /('(\\.|[^'])*'|"(\\.|[^"])*")/y;
    var ONELINECOMMENT      = /\/\/.*/y;
    var MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//y;
    //var TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/y;
    // Juan Hernandez
    var TWOCHAROPERATORS    = /(===|!==|!=|[+][+]|--|==|<=|>=|[+]=|-=|\/=|[*]=|%=|&&|[|][|])/y;
    var ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]%?])/y; // May be some character is missing?
    var tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT, 
                  MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS ];


    // Make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function() {
      var str = m[0];
      i += str.length; // Warning! side effect on i
      return str;
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this) return; 

    // Loop through this text
    while (i < this.length) {
        tokens.forEach( function(t) { t.lastIndex = i;}); // Only ECMAScript5
        from = i;
        // Ignore whitespace and comments
        if (m = WHITES.exec(this) || 
           (m = ONELINECOMMENT.exec(this))  || 
           (m = MULTIPLELINECOMMENT.exec(this))) { getTok(); }
        // name.
        else if (m = ID.exec(this)) {
            result.push(make('name', getTok()));
        } 
        // number.
        else if (m = NUM.exec(this)) {
            n = +getTok();

            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', m[0]).error("Bad number");
            }
        } 
        // string
        else if (m = STRING.exec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
        } 
        // two char operator
        else if (m = TWOCHAROPERATORS.exec(this)) {
            result.push(make('operator', getTok()));
        // single-character operator
        } else if (m = ONECHAROPERATORS.exec(this)){
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

