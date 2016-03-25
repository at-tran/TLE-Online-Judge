var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');

var UploadModal = require('./uploadmodal.js');

var tabs = [
    {
        title: "Home",
        content: "Welcome home"
    },
    {
        title: "Problems",
        content: "Prepare to face the challenge"
    },
    {
        title: "Scores",
        content: "Face your judgement"
    }
];

var uploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

var UploadModalButton = require('./uploadmodalbutton.js')(uploadModal);
ReactDOM.render(<UploadModalButton />, document.getElementById('UploadModalButton'));

var NavBar = require('./navbar.js');
ReactDOM.render(<NavBar tabs={tabs}/>, document.getElementById('NavBar'));
