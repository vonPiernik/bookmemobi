import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideBar.css';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        const { book } = this.props;
        return (
            <div className={"side-bar " + (book.sidebarOpened ? "side-bar-show" : "side-bar-hide")} >
                <h3>Sidebar with book details</h3>
                {book.sidebarOpened &&
                    <p>Testing this feature</p>
                }
            </div>
        );
    }
}
// export default SideBar;
function mapStateToProps(state) {
    const { book } = state;
    return {
        book
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar }; 