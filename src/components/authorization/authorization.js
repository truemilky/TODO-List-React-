import React, { Component } from "react";
import './authorization.css';
import "../post-add-form/post-add-form.css";

export default class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        
        this.setState(() => {
            if (this.state.text) {
                this.props.setName(this.state.text);
                return {
                    text: "",
                    isLogged: !this.state.isLogged
                }
            } else {
                return {
                    error: !this.state.error
                }
            }
        })
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value,
        })
    }

    render() {

        return (
            <form className="authorization-form" onSubmit={this.onSubmit}>
                <h1 className="authorization-title">Enter your name:</h1>
                <input type="text" name="auth-name" className="form-conrol new-post-label m-10" placeholder="Your name" onChange={this.onValueChange}></input>
                <button type="submit" className="authorization-btn add-btn">GO!</button>
            </form>
        )
    }
}