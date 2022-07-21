import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";

import "./app.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.setData = this.setData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.setState(() => {
            if (!this.getData() || localStorage.getItem('data') === null) {
                return {
                    data: [
                        { label: "This note is for test =)", important: true, liked: false, id: new Date().toISOString() }
                    ]
                }
            } else {
                let localData = this.getData();

                return {
                    data: localData
                }
            };
        });
    }

    getData() {
        let objData = JSON.parse(localStorage.getItem('data'));
        return objData;
    }

    setData(data) {
        let jsonData = JSON.stringify(data);
        localStorage.setItem('data', jsonData);
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            this.setData(newArr);

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            liked: false,
            id: new Date().toISOString()
        }

        this.setState(({ data }) => {
            const newArr = [...data, newItem];

            this.setData(newArr);
            return {
                data: newArr
            }
        });
    }

    onToggleLiked(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = { ...old, liked: !old.liked };

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            this.setData(newArr);
            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = { ...old, important: !old.important };

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            this.setData(newArr);

            return {
                data: newArr
            }
        });
    }

    onUpdateSearch(term) {
        this.setState({ term })
    }

    filterPost(items, filter) {
        if (filter === "liked") {
            return items.filter(item => item.liked)
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state;
        const liked = data.filter(item => item.liked).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);


        return (
            <div className="app">
                <AppHeader
                    notes={allPosts}
                    likes={liked} />
                <div className="search-panel">

                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />

                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />

                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleLiked={this.onToggleLiked}
                    onToggleImportant={this.onToggleImportant} />
                <PostAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }
}