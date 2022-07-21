import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";
import Authorization from "../authorization/authorization";

import "./app.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: "This note is for test =)", important: true, liked: false, id: new Date().toISOString() }
            ],
            term: '',
            filter: 'all',
            isLogged: false,
            userName: ""
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.setData = this.setData.bind(this);
        this.setName = this.setName.bind(this);
        this.getItem = this.getItem.bind(this);
    }

    async componentDidMount() {
        const storageUser = await this.getItem('userName');
        const storageData = await this.getItem('data');
        const isLoggedStorage = await this.getItem('isLogged');

        this.setState(() => {
            if (storageData) {
                return {
                    data: storageData,
                    userName: storageUser,
                    isLogged: isLoggedStorage
                }
            } else {
                return {
                    data: [
                        { label: "This note is for test =)", important: true, liked: false, id: new Date().toISOString() }
                    ],
                    userName: storageUser,
                    isLogged: isLoggedStorage
                }
            }
        });
    }

    getItem(item) {
        const parsedItem = JSON.parse(localStorage.getItem(String(item)));
        return parsedItem;
    }

    setData(data) {
        let jsonData = JSON.stringify(data);
        localStorage.setItem('data', jsonData);
    }

    setName(name) {
        let jsonName = JSON.stringify(name);
        localStorage.setItem('userName', jsonName);
        let jsonLog = JSON.stringify(!this.state.isLogged);
        localStorage.setItem('isLogged', jsonLog);

        this.setState(() => {
            return {
                isLogged: !this.state.isLogged,
                userName: name
            }
        })
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
        const { data, term, filter, isLogged, userName } = this.state;
        const liked = data.filter(item => item.liked).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        if (!isLogged) {
            return (
                <div className="app">
                    <Authorization
                        setName={this.setName}
                        isLogged={isLogged} />
                </div>
            )
        } else {

            return (
                <div className="app">
                    <AppHeader
                        userName={userName}
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
}