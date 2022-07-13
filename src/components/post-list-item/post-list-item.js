import React, {Component} from "react";
import "./post-list-item.css";

export default class PostListItem extends Component {


    render () {
        const {label, onDelete, onToggleLiked, onToggleImportant, important, liked} = this.props;

        let classesForStar = "fa fa-star";
        let classesForHeart = "fa fa-heart";
        let classesForListItem = "app-list-item";

        if (important) {
            classesForStar += " active";
            classesForListItem += " active";
        }

        if (liked) {
            classesForHeart += " active";
        }

        return (
            <div className={classesForListItem}>
                <span className="app-list-item-label">
                    {label}
                </span>
                <div className="app-list-interactives">
                    <button 
                        type="button" 
                        className="btn-star"
                        onClick={onToggleImportant}>
                        <i className={classesForStar}></i>
                    </button>
                    <button 
                        type="button" 
                        className="btn-trash"
                        onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-heart"
                        onClick={onToggleLiked}>
                        <i className={classesForHeart}></i>
                    </button>
                    
                </div>
            </div>
        )
    }
}