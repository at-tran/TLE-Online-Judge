var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');

var UploadModal = require('./UploadModal.js');
var myUploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

var UploadModalButton = require('./UploadModalButton.js')(myUploadModal);
ReactDOM.render(<UploadModalButton />, document.getElementById('UploadModalButton'));
