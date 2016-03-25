var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var AceEditor = require('react-ace');
require('brace/mode/pascal');
require('brace/theme/monokai');

module.exports = React.createClass({
    handleClick: function() {
        this.props.uploadModal.showModal();
    },

    render: function() {
        return (
            <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>
                Upload Submission
            </Button>
        );
    }
});

