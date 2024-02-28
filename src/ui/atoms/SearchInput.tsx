"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/ui/icons/SearchIcon";

const SearchInput = () => {
	const router = useRouter();
	const [query, setQuery] = useState("");

	const handleSearch = useCallback(() => {
		router.push(`/search?query=${query}`);
		setQuery("");
	}, [query, router]);

	useEffect(() => {
		if (query.length > 1) {
			const searchTimer = setTimeout(() => {
				handleSearch();
			}, 500);

			return () => clearTimeout(searchTimer);
		}
	}, [handleSearch, query]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="relative w-4/5 sm:w-auto">
			<input
				type="text"
				aria-label="search"
				placeholder="Search"
				role="searchbox"
				className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-300 focus:border-blue-500 focus:outline-none"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
			<SearchIcon
				cls="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
				clickFn={handleSearch}
			/>
		</div>
	);
};

export { SearchInput };
