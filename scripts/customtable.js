var React = require('react');
var Table = require('react-bootstrap/lib/Table');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

module.exports = React.createClass({
    render: function() {
        if (this.props.data === undefined) return <div>Loading...</div>;

        var rows = this.props.data.map((row, index) => {
            var data = [];
            for (var key in this.props.columns) {
                data.push(<td key={key}>{row[this.props.columns[key]]}</td>);
            };
            return (
                <tr key={index} className="success">
                    {data}
                </tr>
            );
        });

        var headings = [];
        for (var key in this.props.columns) {
            headings.push(<td key={key}>{key}</td>);
        }

        return (
            <Table>
                <thead>
                    <tr>
                        {headings}
                    </tr>
                </thead>
                <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {rows}
                </ReactCSSTransitionGroup>
            </Table>
        )
    }
})
