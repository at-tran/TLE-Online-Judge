var $ = require('jquery');
window.$ = window.jQuery = $;
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');

module.exports = React.createClass({
    render: function() {
        var tabs = this.props.tabs.map(function(tab, index) {
            return <Tab eventKey={index} key={index} title={tab.title}>{tab.content}</Tab>
        });
        return (
            <Tabs defaultActiveKey={1}>
                {tabs}
            </Tabs>
        );
    }
});
