var React = require('react');
var Dropzone = require('react-dropzone');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var AceEditor = require('react-ace').default;
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');
var Select = require('react-select');
var path = require('path');
var FormControl = require('react-bootstrap/lib/FormControl');
require('brace/mode/pascal');
require('brace/theme/monokai');

const languages = [
    { value: 'Pascal', label: 'Pascal' },
    { value: 'C++', label: 'C++'},
    { value: 'Python', label: 'Python'}
];

var FileContent = React.createClass({
    render: function() {
        return (
            <div>
                <AceEditor
                    mode="pascal"
                    theme="monokai"
                    value={this.props.data.content}
                    onChange={this.props.onChange}
                    name={this.props.index.toString()}
                    editorProps={{$blockScrolling: true}}
                />

                <FormControl
                    type="text"
                    value={this.props.data.ID}
                    placeholder="Problem ID"
                    onChange={this.props.onChangeID}
                />

                <Select
                    name="language"
                    value={this.props.data.language}
                    simpleValue
                    options={languages}
                    onChange={this.props.onChangeLanguage}
                    clearable={false}
                    placeholder="Language"
                />

                <Button onClick={this.props.onRemove}>Remove</Button>

            </div>
        );
    }
});

var FileContentTabs = React.createClass({
    render: function() {
        var contents = this.props.contents.map(function(content, index) {
            return (
                <Tab key={index} eventKey={index} title={content.ID}>
                    <FileContent
                        data={content}
                        index={index}
                        onRemove={this.props.onRemove(index)}
                        onChange={this.props.onChange(index)}
                        onChangeLanguage={this.props.onChangeLanguage(index)}
                        onChangeID={this.props.onChangeID(index)}
                    />
                </Tab>
            );
        }.bind(this));
        return (
            <Tabs defaultActiveKey={0} id="file-content-tabs">
                {contents}
            </Tabs>
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

    onRemove: function(index) {
        return function() {
            var newContents = this.state.contents;
            newContents.splice(index, 1);
            this.setState({contents: newContents});
        }.bind(this);
    },

    onChangeLanguage: function(index) {
        return function(newValue) {
            var newContents = this.state.contents;
            newContents[index].language = newValue;
            this.setState({contents: newContents});
        }.bind(this);
    },

    onChangeID: function(index) {
        return function(e) {
            var newContents = this.state.contents;
            newContents[index].ID = e.target.value;
            this.setState({contents: newContents});
        }.bind(this);
    },

    getLanguageFromExt: function(ext) {
        switch(ext) {
            case '.cpp': return 'C++';
            case '.pas': return 'Pascal';
            default: return null;
        }
    },

    onDrop: function(files) {
        files.forEach(function(file) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                var ext = path.extname(file.name);
                this.setState({
                    contents: this.state.contents.concat({
                        ID: path.basename(file.name, ext),
                        content: e.target.result,
                        size: file.size,
                        language: this.getLanguageFromExt(ext)
                    })
                });
            }.bind(this);
            fileReader.readAsText(file);
        }.bind(this));
    },

    handleSubmit: function() {
        $.ajax('upload', {
            type: 'POST',
            // dataType: 'json',
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
            <div>
                <Button id="upload-button" bsStyle="primary" bsSize="large" onClick={this.showModal}>
                    Upload Submission
                </Button>
                <Modal show={this.state.show} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload submission</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Dropzone onDrop={this.onDrop}>
                            <div>Upload</div>
                        </Dropzone>
                        <FileContentTabs
                            contents={this.state.contents}
                            onChange={this.onChange}
                            onRemove={this.onRemove}
                            onChangeLanguage={this.onChangeLanguage}
                            onChangeID={this.onChangeID}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
