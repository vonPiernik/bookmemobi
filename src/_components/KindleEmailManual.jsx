import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import './KindleEmailManual.css';

export class KindleEmailManual extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            currentSlide: 1
        };
    }

    prevSlide(){
        this.setState((prevState, props) => ({
            currentSlide: prevState.currentSlide - 1
        }))
    }
    
    nextSlide(){
        this.setState((prevState, props) => ({
            currentSlide: prevState.currentSlide + 1
        }))
    }

    render() {
        return(
            <div className="kindle-email-manual">
                <div className="kindle-email-manual-wrapper">
                    <div className={"kindle-email-manual-slides" + " slide-active-" + this.state.currentSlide}>
                        <div className="slide slide1">
                            <h1>slide1</h1>
                        </div>
                        <div className="slide slide2">
                            <h1>slide2</h1>
                        </div>
                        <div className="slide slide3">
                            <h1>slide3</h1>
                        </div>
                        <div className="slide slide4">
                            <h1>slide4</h1>
                        </div>
                    </div>

                    <div className="kindle-email-manual-nav">
                        <Button 
                            text="Prev"
                            role="kindle-email-manual-nav-prev"
                            disabled={ this.state.currentSlide === 1 ? "disabled" : ""}
                            onClick={ () => this.prevSlide() } />
                        <div className="kindle-email-manual-nav-ind">{this.state.currentSlide} / 4</div>
                        <Button 
                            text="Next"
                            role="kindle-email-manual-nav-next"
                            disabled={ this.state.currentSlide === 4 ? "disabled" : ""}
                            onClick={ () => this.nextSlide() } />
                            
                    </div>
                </div>
            </div>
        )
    }
};

KindleEmailManual.propTypes = {
    role: PropTypes.string
};
