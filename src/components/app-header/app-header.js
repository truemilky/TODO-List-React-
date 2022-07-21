import React from "react";
import "./app-header.css";

/* export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalLikes: 0
        }
    }

    render () {
        return (
            <div className="app-header">
                <h1>Rodion Peniavskyi</h1>
                <h2>5 notes, 0 notes you liked</h2>
            </div>
        )
    }
} */

const AppHeader = ({ notes, likes, userName }) => {
    return (
        <div className="app-header">
            <h1>{userName}</h1>
            <h2>{notes} notes, {likes} notes you liked</h2>
        </div>
    )
}

export default AppHeader;