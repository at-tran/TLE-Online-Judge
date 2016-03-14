var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');

var UploadBox = React.createClass({
    getInitialState: function() {
        return {contents: []};
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

    render: function() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Upload</div>
                </Dropzone>
                <FileContentList contents={this.state.contents} />
                <SubmitButton contents={this.state.contents} />
            </div>
        )
    }
});

var FileContent = React.createClass({
    render: function() {
        return (
            <div style={{whiteSpace: "pre-wrap"}}>
                {this.props.data.filename} <br/>
                {this.props.data.content}
            </div>
        )
    }
})

var FileContentList = React.createClass({
    render: function() {
        var contents = this.props.contents.map(function(content, index) {
            return <FileContent data={content} key={index} />;
        })
        return (
            <div>
                {contents}
            </div>
        )
    }
})

var SubmitButton = React.createClass({
    handleSubmit: function() {
        $.ajax('upload', {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(this.props.contents),
            success: function() {
                console.log('SUCCESS!');
            }
        });
    },

    render: function() {
        return (
            <button onClick={this.handleSubmit}>
                Upload
            </button>
        )
    }
})

ReactDOM.render(<UploadBox />, document.getElementById('content'));
