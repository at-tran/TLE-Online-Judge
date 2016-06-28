window.$ = window.jQuery = require('jquery');
require('bootstrap');
var React = require('react');

var UploadModal = require('./uploadmodal.js');
var CustomTable = require('./customtable.js');
var NavBar = require('./navbar.js');

var io = require('socket.io-client');

var ResultsTableColumns = {
    Username: "username",
    Problem: "problem",
    Score: "score",
    "File type": "filetype",
    Time: "time"
}

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentWillMount: function() {
        this.socket = io.connect(location.origin);
        this.socket.on('message', (data) => {
            console.log(data);
            for (var key in data) {
                var newState = this.state;
                if (newState[key] === undefined) newState[key] = data[key];
                else newState[key].unshift(data[key]);
                this.setState(newState);
            }
        });
    },

    render: function() {
        var tabs = [{
            title: <span className="glyphicon glyphicon-home"> Home</span>,
            content: "Welcome home"
        }, {
            title: <span className="glyphicon glyphicon-list-alt"> Problem</span>,
            content: "Prepare to face the challenge"
        }, {
            title: <span className="glyphicon glyphicon-signal"> Status</span>,
            content: <CustomTable data={this.state.results} columns={ResultsTableColumns} />
        }, {
            title: <span className="glyphicon glyphicon-flag"> Help</span>,
            content: "Haaaaaaaalp"
        }];
        return (
            <div>
                <UploadModal />
                <NavBar tabs={tabs} />
            </div>
        );
    }
});
