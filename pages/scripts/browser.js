var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var App = require('./app.js');

 ReactDOM.render(<App />, document.getElementById('content'));
// console.log(ReactDOMServer.renderToString(<App />));
