var $ = require('jquery');
window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');
require('bootstrap');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

var FileContent = React.createClass({
    render: function() {
        return (
            <div style={{whiteSpace: "pre-wrap"}}>
                {this.props.data.filename} <br/>
                {this.props.data.content}
            </div>
        );
    }
})

var FileContentList = React.createClass({
    render: function() {
        var contents = this.props.contents.map(function(content, index) {
            return <FileContent data={content} key={index} />;
        });
        return (
            <div>
                {contents}
            </div>
        );
    }
})

var UploadModal = React.createClass({
    getInitialState: function() {
        return {contents: [], show: false};
    },

    showModal: function() {
        this.setState({show: true});
    },

    hideModal: function() {
        this.setState({show: false});
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
                    <FileContentList contents={this.state.contents} />
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

var myUploadModal = ReactDOM.render(<UploadModal />, document.getElementById('UploadModal'));

var UploadModalButton = React.createClass({
    handleClick: function() {
        myUploadModal.showModal();
    },

    render: function() {
        return (
            <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>
                Upload Submission
            </Button>
        );
    }
})

ReactDOM.render(<UploadModalButton />, document.getElementById('UploadModalButton'));
