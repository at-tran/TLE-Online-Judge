var React = require('react');
var Table = require('react-bootstrap/lib/Table');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var io = require('socket.io-client');

module.exports = React.createClass({
    getInitialState: function() {
        return {results: []};
    },

    componentWillMount: function() {
        $.ajax('scores', {
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                this.setState({results: data}); 
            }.bind(this)
        });
        // var host = location.origin.replace(/^http/, 'ws');
        // var ws = new WebSocket(host);
        var socket = io.connect(location.origin);
        socket.on('message', function(data) {
            this.setState({
                results: this.state.results.concat(data)
            });
        }.bind(this));
    },

    render: function() {
        var rows = this.state.results.map((result, index) => {
            return (
                <tr key={index} className="success">
                    <td>{result.username}</td>
                    <td>{result.problem}</td>
                    <td>{result.score}</td>
                    <td>{result.time}</td>
                </tr>
            )
        })
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Problem</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {rows}
                </ReactCSSTransitionGroup>
            </Table>
        )
    }
})
