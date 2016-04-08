var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app.js');

ReactDOM.render(<App />, document.getElementById('content'));
// console.log(require('react-dom/server').renderToString(<App />));
