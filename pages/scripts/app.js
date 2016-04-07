var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');

var UploadModal = require('./uploadmodal.js');
var ResultsTable = require('./resultstable.js');
var UploadModalButton = require('./uploadmodalbutton.js');
var NavBar = require('./navbar.js');

// var results = [
//     {
//         username: "Khang",
//         problem: "HACKNASA",
//         score: "100/100",
//         time: "0.69"
//     },
//     {
//         username: "Tho",
//         problem: "PROTECTNASA",
//         score: "0/100",
//         time: "0.00"
//     }
// ]

var tabs = [
    {
        title: <span className="glyphicon glyphicon-home"> Home</span>,
        content: "Welcome home"
    },
    {
        title: <span className="glyphicon glyphicon-list-alt"> Problem</span>,
        content: "Prepare to face the challenge"
    },
    {
        title: <span className="glyphicon glyphicon-signal"> Status</span>,
        content: <ResultsTable />
    },
    {
        title: <span className="glyphicon glyphicon-flag"> Help</span>,
        content: "Haaaaaaaalp"
    }
];

// var uploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

// ReactDOM.render(<UploadModalButton uploadModal={uploadModal} />, document.getElementById('UploadModalButton'));

// ReactDOM.render(<NavBar tabs={tabs} />, document.getElementById('NavBar'));

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <UploadModal />
                <NavBar tabs={tabs} />
            </div>
        );
    }
});
