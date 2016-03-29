var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');
var Table = require('react-bootstrap/lib/Table');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

module.exports = React.createClass({
    getInitialState: function() {
        return {results: []};
    },

    componentWillMount: function() {
        setInterval(function() {
            $.ajax('scores', {
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    this.setState({results: data}); 
                }.bind(this)
            });
        }.bind(this), 5000);
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
