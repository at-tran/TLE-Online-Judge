var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');

var UploadModal = require('./uploadmodal.js');
var ScoresTable = require('./scorestable.js');
var UploadModalButton = require('./uploadmodalbutton.js');
var NavBar = require('./navbar.js');

var results = [
    {
        username: "Khang",
        problem: "HACKNASA",
        score: "100/100",
        time: "0.69"
    },
    {
        username: "Tho",
        problem: "PROTECTNASA",
        score: "0/100",
        time: "0.00"
    }
]

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
        content: <ScoresTable results={results} />
    }
];

var uploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

ReactDOM.render(<UploadModalButton uploadModal={uploadModal} />, document.getElementById('UploadModalButton'));

ReactDOM.render(<NavBar tabs={tabs} />, document.getElementById('NavBar'));
