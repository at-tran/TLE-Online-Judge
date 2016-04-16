var React = require('react');
var Table = require('react-bootstrap/lib/Table');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

module.exports = React.createClass({
    render: function() {
        if (this.props.data === undefined) return <div>"Loading..."</div>;
        var rows = this.props.data.map((row, index) => {
            return (
                <tr key={index} className="success">
                    {this.props.columns.map(function(column, index) {
                        return <td key={index}>{row[column.key]}</td>;
                    })}
                </tr>
            )
        });
        return (
            <Table>
                <thead>
                    <tr>
                        {this.props.columns.map(function(column, index) {
                            return <td key={index}>{column.name}</td>;
                        })}
                    </tr>
                </thead>
                <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {rows}
                </ReactCSSTransitionGroup>
            </Table>
        )
    }
})
