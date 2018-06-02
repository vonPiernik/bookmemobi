import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import './KindleEmailManual.css';
import {userActions} from '../_actions/user.actions';

export class KindleEmailManual extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            currentSlide: 1,
            kindleEmail: (this.props.kindleEmail ? this.props.kindleEmail : "")
        }; 
        

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    setKindleEmail(){
        if(this.props.kindleEmail.length > 0){
            dispatch(userActions.setKindleEmail(this.props.kindleEmail));
        }
    }
    
    getKindleEmail(){
        this.setState({
            kindleEmail: this.props.kindleEmail
        })
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
                <div    className="kindle-email-manual-overlay"
                        onClick={() => this.props.toggleKindleEmailManual() }></div>
            
                <div className="kindle-email-manual-wrapper">
                    <button className="button-role-close-manual" 
                            onClick={() => this.props.toggleKindleEmailManual() }>
                        <span></span><span></span>
                    </button>

                    <div className={"kindle-email-manual-slides" + " slide-active-" + this.state.currentSlide}>
                        <div className="slide slide1">
                            <small>Step 1</small>
                            <h1>Tell us where to send ebooks</h1>
                            <p>You have to enter your Send-to-Kindle E-Mail in the box below, so we can know, where to send your ebooks files. If you don't know your Send-to-Kindle E-Mail, you can check it in <a href="#" target="_BLANK">Manage Your Content and Devices</a> on Amazon, in the <strong>Settings -> Personal Document Settings</strong> section.</p>
                            <img src="/public/img/manual1.jpg" alt="Amazon Accout Settings Screen" width="200px"/>
                            <div className="kindle-email-set">
                                {this.state.kindleEmail &&
                                    <p className="kindle-email-ok">Your Send-to-Kindle E-Mail is set. You can go to the next step!</p>
                                }
                                {!this.state.kindleEmail &&
                                    <p className="kindle-email-empty">Please enter your Send-to-Kindle E-Mail adress.</p>
                                }
                                <label htmlFor="kindleEmail">
                                    <input type="text" name="kindleEmail" id="kindleEmail" onChange={this.handleChange}
                                            value={ this.state.kindleEmail ? this.state.kindleEmail.substring(0, this.state.kindleEmail.indexOf('@')) : ""}/>
                                    @kindle.com
                                </label>
                                <Button text="Save"
                                        type="green"
                                        role="kindle-email-manual-set-email"
                                        onClick={ () => this.setKindleEmail() }/>
                            </div>
                        </div>
                        <div className="slide slide2">
                            <small>Step 2</small>
                            <h1>Add our email to the list of Approved Emails</h1>
                            <p>Now it's time to add our email as a veryfied. You should do this in the same place, that you visited to check your Send-to-Kindle E-Mail (<a href="#" target="_BLANK">GO HERE</a>, then Settings -> Personal Document Settings). Under Approved Personal Document E-mail List click <strong>Add a new approved e-mail address</strong> and type <strong className="bookme-email-adress">bookme@bookmemobi.tk</strong>.</p>

                            <img src="/public/img/manual2.jpg" alt="Approved Personal Document E-mail List on Amazon" width="200px"/>
                            <div className="add-email-to-approved">
                                <p>Remember to add this email to Approved Personal Document E-mail List:</p>
                                <strong>bookme@bookmemobi.tk</strong>
                                <p>It is very important and we have no way to check if you have actually done this properly. If you ommit this step, Amazon will not allow any files to reach your Kindle. You can still use our app without doing it, but the Send To Kindle functionality will not work. </p>
                            </div>
                            
                        </div>
                        <div className="slide slide3">
                            <small>Step 3</small>
                            <h1>That's all! You are ready to go!</h1>
                            <p>I you followed previous steps the connection is now configured. You can go to book details and click Send to Kindle, then you just have to turn-on Wi-Fi or 3G on your Kindle and wait a moment.</p>
                            <p className="important"><strong>Remember!</strong> If you are connecting via 3G, Amazon will incur charges for using it. We are not reponsible for any costs that it will make. Make sure that you know what you are doing, otherwise just connect to Wi-Fi network.</p>
                            <p>Please confirm, so we can know that you've dealt with it :) <br/><small>If not - see the next step.</small></p>

                            <Button text="Confirm"
                                    type="green"
                                    role="confirm-configuration-steps"/>

                           
                        </div>
                        <div className="slide slide4">
                            <small>Step 4</small>
                            <h1>Contact us in case of troubles <small>(optional)</small></h1>
                                <p>In case you have any trouble, fell free to contact us. We are happy to recive any feedback from you. The more we know about potential problem, the better and faster we can solve them. We can also help you with configuration or find out why there are any problems.</p>
                            <div className="if-its-not-working">
                                <p>You have an idea or just a comment about BookMeMobi? Write to us. You want to see some feature, that we have not thought about? Write to us as well. You are a software developer and you want to advice us or you need an advice? Yeap, you guessed it. Write to us ;)</p>
                                <p className="contact-info">Our email is: <strong>mail@mail.pl</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="close-manual" onClick={() => this.props.toggleKindleEmailManual() }>Close this window and finish later.</div>
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
