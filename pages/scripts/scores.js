var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
    onDrop: function(files) {
        var data = new FormData();
        $.each(files, function(key, value) {
            data.append(key, value);
        });

        $.ajax('upload', {
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function() {
                console.log('SUCCESS!');
            }
        });
    },

    render: function() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Upload</div>
                </Dropzone>
            </div>
        )
    }
});

ReactDOM.render(<DropzoneDemo />, document.getElementById('content'));