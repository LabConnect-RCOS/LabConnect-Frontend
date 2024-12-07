import React, { useState } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

const Jobs = () => {
    const [filters, setFilters] = useState({
        search: "",
        savedOnly: false,
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: "",
            savedOnly: false,
        });
    };

    const filteredPosts = (posts) => {
        let result = posts;
        if (filters.search) {
            result = result.filter((post) =>
                post.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        if (filters.savedOnly) {
            result = result.filter((post) => post.saved);
        }
        return result;
    };

    var [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search");

    return (
        <section className="flex flex-col gap-3">
            <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
            <input
                type="text"
                name="search"
                placeholder="Search Jobs"
                value={filters.search}
                onChange={handleFilterChange}
            />
            <button onClick={resetFilters}>Reset Filters</button>
            {pages.activePage === "Search" && (
                <section>
                    {filteredPosts(Posts).map((post) => (
                        <Posts key={post.id} {...post} />
                    ))}
                </section>
            )}
        </section>
    );
};

export default Jobs;
