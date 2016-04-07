var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
var Table = require('react-bootstrap/lib/Table');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

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
        var host = location.origin.replace(/^http/, 'ws');
        var ws = new WebSocket(host);
        ws.onmessage = function(event) {
            this.setState({
                results: this.state.results.concat(JSON.parse(event.data))
            });
        }.bind(this);
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
