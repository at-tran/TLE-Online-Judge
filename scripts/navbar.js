var React = require('react');
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');

module.exports = React.createClass({
    render: function() {
        var tabs = this.props.tabs.map(function(tab, index) {
            return <Tab eventKey={index} key={index} title={tab.title}>{tab.content}</Tab>
        });
        return (
            <nav className="navbar navbar-nav">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">TLE online judge</a>
                    </div>

                    <ul className="nav navbar-nav">
                        <li>
                            <div className="right-inner-addon ">
                                <i className="glyphicon glyphicon-search"></i> 
                                <input type="search" className="form-control" placeholder="Search" />
                            </div>
                        </li>
                        <li><a href="signup.html"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                        <li><a href="login.html"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
                <Tabs defaultActiveKey={0} id="navbar">
                    {tabs}
                </Tabs>
            </nav>
        );
    }
});

