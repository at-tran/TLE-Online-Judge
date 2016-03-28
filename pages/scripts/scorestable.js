var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');
var Table = require('react-bootstrap/lib/Table');

module.exports = React.createClass({
    render: function() {
        var rows = this.props.results.map((result, index) => {
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
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }
})
