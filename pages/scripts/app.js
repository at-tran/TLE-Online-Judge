var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');

var UploadModal = require('./UploadModal.js');
var uploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

var UploadModalButton = require('./UploadModalButton.js')(uploadModal);
ReactDOM.render(<UploadModalButton />, document.getElementById('UploadModalButton'));

var NavBar = require('./NavBar.js');
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
ReactDOM.render(<NavBar tabs={tabs}/>, document.getElementById('NavBar'));
