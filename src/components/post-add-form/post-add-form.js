import React, { Component } from "react";
import TypeAnimation from "../type-animation/type-animation";
import "./post-add-form.css";

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        this.setState(() => {
            if (this.state.text) {
                this.props.onAdd(this.state.text);

                return {
                    text: ''
                }
            }
        });
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className="bottom-panel">
                <div className="bottom-panel-input-wrapper">
                    <input
                        type="text"
                        placeholder="What do you thinking about?"
                        className="form-conrol new-post-label"
                        onChange={this.onValueChange}
                        value={this.state.text}
                    />
                    <TypeAnimation />
                </div>

                <button
                    type="submit"
                    className="add-btn">Add</button>
            </form>
        )
    }
}

