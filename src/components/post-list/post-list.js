import React from "react";
import PostListItem from "../post-list-item/post-list-item";
import "./post-list.css"

const PostList = ({posts, onDelete, onToggleLiked, onToggleImportant}) => {
    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <li key={id}>
                <PostListItem 
                        {...itemProps}
                        onDelete={() => onDelete(id)}
                        onToggleLiked={() => onToggleLiked(id)}
                        onToggleImportant={() => onToggleImportant(id)}/>
            </li>
        )
    })

    return ( 
        <ul className="app-list">
            {elements}
        </ul>
    )
}

export default PostList;