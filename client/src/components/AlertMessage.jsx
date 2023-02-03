import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import '../css/alert.css';
export default class AlertMessage extends Component{
    render(){
        return(
            <div id="" className="">
                <Alert className="alert" variant={this.props.type}>
                    {this.props.text}
                </Alert>
            </div>
        )
    }
}