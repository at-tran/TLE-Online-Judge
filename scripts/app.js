window.$ = window.jQuery = require('jquery');
require('bootstrap');
var React = require('react');

var UploadModal = require('./uploadmodal.js');
var CustomTable = require('./customtable.js');
var NavBar = require('./navbar.js');

var io = require('socket.io-client');

module.exports = React.createClass({
    ResultsTableColumns: [
        {
            name: "Username",
            key: "username"
        },
        {
            name: "Problem",
            key: "problem"
        },
        {
            name: "Score",
            key: "score"
        },
        {
            name: "Time",
            key: "time"
        }
    ],

    getInitialState: function() {
        return {};
    },

    componentWillMount: function() {
        this.socket = io.connect(location.origin);
        this.socket.on('message', function(data) {
            for (var key in data) {
                if (this.state[key] === undefined) {
                    var newState = this.state;
                    newState[key] = data[key];
                    this.setState(newState);
                }
                else this.setState(this.state[key].concat(data[key]));
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                <UploadModal />
                <NavBar
                    tabs={[
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
                            content: <CustomTable data={this.state.results} columns={this.ResultsTableColumns} />
                        },
                        {
                            title: <span className="glyphicon glyphicon-flag"> Help</span>,
                            content: "Haaaaaaaalp"
                        }
                    ]}
                />
            </div>
        );
    }
});
