var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
    getInitialState: function() {
        return {contents: []};
    },

    onDrop: function(files) {
        // $.each(files, function(key, value) {
        //     console.log(value);
        // })
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            console.log(e.target.result);
            this.setState({
                contents: this.state.contents.concat(e.target.result)
            });
        }.bind(this);
        files.forEach(function(file) {fileReader.readAsText(file)});
        // var data = new FormData();
        // $.each(files, function(key, value) {
        //     data.append(key, value);
        // });

        // $.ajax('upload', {
        //     type: 'POST',
        //     data: data,
        //     cache: false,
        //     dataType: 'json',
        //     processData: false,
        //     contentType: false,
        //     success: function() {
        //         console.log('SUCCESS!');
        //     }
        // });
    },

    render: function() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Upload</div>
                </Dropzone>
                <FileContentList contents={this.state.contents} />
            </div>
        )
    }
});

var FileContent = React.createClass({
    render: function() {
        return (
            <div style={{whiteSpace: "pre-wrap"}}>
                {this.props.data}
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

ReactDOM.render(<DropzoneDemo />, document.getElementById('content'));
