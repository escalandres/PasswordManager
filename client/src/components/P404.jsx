import React, { Component } from 'react';
// import Alert from 'react-bootstrap/Alert';
import '../css/404.css';
export default class P404 extends Component{
    render(){
        return(
          <div className="wrapper">
            <div className="error">
              <div className="number">4</div>
              <div className="illustration">
                <div className="circle"></div>
                <div className= "clip">
                  <div className="paper">
                    <div className="face">
                      <div className="eyes">
                        <div className= "eye eye__left"></div>
                        <div className="eye eye__right"></div>
                      </div>
                      <div className="cheeks cheeks__left"></div>
                      <div className="cheeks cheeks__right"></div>
                      <div className="mouth"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="number">4</div>
            </div>
            <div className= "text">Oops. The page you're looking
            for doesn't exist. </div>
            <a className="button" href="#">Back Home V </a>
        </div>
      
      )
    }
}





