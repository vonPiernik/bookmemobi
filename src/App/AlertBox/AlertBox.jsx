import React from 'react';
import { connect } from 'react-redux';

import './AlertBox.css';

class AlertBox extends React.Component {
    constructor(props) {
        super(props);

    }

    getAlert(alert){
        let jsonMessage = {};
        if(alert.message){
            if(alert.message.message) jsonMessage = JSON.parse(alert.message);
        } 
        if(jsonMessage.message) return jsonMessage.message;
        return alert.message;
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="infoMessagesBox">
                {/* {uploadBook.uploading && <div className="infoMessage">Uploading { files.map((f, i) => <span key={i}>{i>0 && ","}{f.name}</span>) }...</div>} */}
                <div className={"infoMessage " + (alert.type ? alert.type : "") + (alert.message ? " infoMessageVisible" : "")}>{ this.getAlert(alert) }</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    };
}

const connectedAlertBox = connect(mapStateToProps)(AlertBox);
export { connectedAlertBox as AlertBox }; 