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

var FileContent = React.createClass({
    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return (
            <div>
                {this.props.data.filename} <br/>
                <Button onClick={this.props.onClick}>Remove</Button>
                <AceEditor
                    mode="pascal"
                    theme="monokai"
                    value={this.props.data.content}
                    onChange={this.props.onChange}
                    name={this.props.index.toString()}
                    editorProps={{$blockScrolling: Infinity}}
                />
            </div>
        );
    }
});

var FileContentList = React.createClass({
    render: function() {
        var contents = this.props.contents.map(function(content, index) {
            return <FileContent data={content} key={index} index={index} onChange={this.props.onChange(index)} onClick={this.props.onClick(index)}/>;
        }.bind(this));
        return (
            <div>
                {contents}
            </div>
        );
    }
})

module.exports = React.createClass({
    getInitialState: function() {
        return {contents: [], show: false};
    },

    showModal: function() {
        this.setState({show: true});
    },

    hideModal: function() {
        this.setState({show: false});
    },

    onChange: function(index) {
        return function(newValue) {
            var newContents = this.state.contents;
            newContents[index].content = newValue;
            this.setState({contents: newContents});
        }.bind(this);
    },

    onClick: function(index) {
        return function() {
            var newContents = this.state.contents;
            newContents[index] = null;
            this.setState({contents: newContents});
        }.bind(this);
    },

    onDrop: function(files) {
        files.forEach(function(file) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                this.setState({
                    contents: this.state.contents.concat({
                        filename: file.name,
                        content: e.target.result,
                        size: file.size
                    })
                });
            }.bind(this);
            fileReader.readAsText(file);
        }.bind(this));
    },

    handleSubmit: function() {
        $.ajax('upload', {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(this.state.contents),
            success: function() {
                console.log('SUCCESS!');
            }
        });
        this.hideModal();
        setTimeout(function() {this.setState({contents: []})}.bind(this), 500);
    },

    render: function() {
        return (
            <Modal show={this.state.show} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropzone onDrop={this.onDrop}>
                        <div>Upload</div>
                    </Dropzone>
                    <FileContentList contents={this.state.contents} onChange={this.onChange} onClick={this.onClick}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
});
