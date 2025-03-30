// Version 3: In this version we are separating the state update logic from App component into a separate context file.
// This file has all state logics as well as a context that is being used in App component.
// App component wraps all the children inside this context which is being passed as the children prop here.
// This is what happens in real world projects.

import { createContext, useContext, useMemo, useState } from "react";
import { createRandomPost } from "./App";

const PostContext = createContext();

function PostProvider({ children }) {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                  `${post.title} ${post.body}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    // Memoizing the value of the Context Provider because it is an object and JS will create new with every re-render.
    const value = useMemo(() => {
        return {
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery,
        };
    }, [searchedPosts, searchQuery]);

    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
}

// This version also creates a custom hook to be used instead of calling:
// useContext(PostContext) all the time, it just calls this hook.
export function usePosts() {
    const context = useContext(PostContext);
    if (context == undefined) {
        throw new Error("PostContext was used outside of PostProvider");
    }
    return context;
}

export default PostProvider;
