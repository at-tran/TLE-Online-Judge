window.$ = window.jQuery = require('jquery');
require('bootstrap');
var React = require('react');

var UploadModal = require('./uploadmodal.js');
var ResultsTable = require('./resultstable.js');
var NavBar = require('./navbar.js');

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
