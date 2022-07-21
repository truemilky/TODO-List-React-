import React, { Component } from "react";
import "./post-status-filter.css"

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            { name: 'all', label: 'All' },
            { name: 'liked', label: 'Liked' }
        ]
    }

    render() {
        const { filter, onFilterSelect } = this.props;
        const buttons = this.buttons.map(({ name, label }) => {
            const active = filter === name;
            const clazz = active ? 'active' : "";
            return (
                <button
                    key={name}
                    className={`btn-filter ${clazz}`}
                    onClick={() => onFilterSelect(name)}>{label}</button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

