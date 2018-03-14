## TDOP, Top Down Operator Precedence Mini JavaScript Parser. Retos

### Hitos

1. Extienda su analizador léxico para que acepte la entrada `var α = 4`
2. Extienda su analizador léxico para que acepte la entrada `var α = ६+६`
    * ६ es [Devanagari](https://es.wikipedia.org/wiki/Devanagari) 6. El devanāgarī es una escritura utilizada en el idioma nepalí y varios idiomas de India
    * Vea [unicode.js](https://github.com/ULL-ESIT-GRADOII-PL/xregexp-example/blob/gh-pages/unicode.js) 
3. Para la fase de autenticación, desacople la autenticación en un repo separado y haga que sea un módulo independiente  con el middleware de autenticación
    1. Mejore este paquete para su publicación en npm registry
    2. Publíquelo en su ámbito `@aluXXX/auth`
    3. Utilice en su analizador léxico el módulo publicado `@aluXX/auth` para la fase de autenticación
    4. Si tiene dudas, repase [ULL-ESIT-PL-1617/evaluar-manejo-de-cookies-y-sessions-en-expressjs-alu0100825510](https://github.com/ULL-ESIT-PL-1617/evaluar-manejo-de-cookies-y-sessions-en-expressjs-alu0100825510)
4. Despliegue la aplicación del analizador léxico en Heroku 

### Recursos

* Repo [ULL-ESIT-PL-1617/evaluar-manejo-de-cookies-y-sessions-en-expressjs-alu0100825510](https://github.com/ULL-ESIT-PL-1617/evaluar-manejo-de-cookies-y-sessions-en-expressjs-alu0100825510) con el middleware de autenticación
* Vea [unicode.js](https://github.com/ULL-ESIT-GRADOII-PL/xregexp-example/blob/gh-pages/unicode.js) con XRegExp
* [https://unpkg.com/xregexp/xregexp-all.js](https://unpkg.com/xregexp/xregexp-all.js)
* [Repositorio con ejemplos de uso de cookies en express](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples)
* El ejemplo [staticauth.js](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/staticauth.js) es similar a lo que se pide
  - En este ejemplo el [directorio gbookexample](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/tree/master/gbookexample) contiene los markdown fuente para el libro
  - El libro es compilado con: `gitbook build gbookexample/ public/`
  - De manera que los HTML se montan en la ruta `content` y se sirven desde el directorio `public`
* Tiene un ejemplo de formulario en la vista [`login.ejs`](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/views/login.ejs) que es usada por el ejemplo [`auth-example.js`](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/auth-example.js#L99-L101)
* [Descripción de la Práctica: Evaluar Manejo de Rutas en ExpressJS](practicalearningcookies.md)
* [Apuntes sobre Cookies y Sessions](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/cookies/)
* [Heroku en los apuntes](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/recursos/heroku.html)
