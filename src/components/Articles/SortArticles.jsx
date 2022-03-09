import { useState } from 'react';

export default function SortArticles({ sortOrderBy, setSortOrderBy }) {
  return (
    <form>
      <label htmlFor="sortarticles-select-sortby">Sort By: </label>
      <select
        id="sortarticles-select-sortby"
        value={sortOrderBy}
        onChange={(e) => setSortOrderBy(e.target.value)}
      >
        <option value={'created_at,DESC'}>Newest</option>
        <option value={'created_at,ASC'}>Oldest</option>
        <option value={'votes,DESC'}>Most Popular</option>
        <option value={'votes,ASC'}>Least Popular</option>
        <option value={'comment_count,DESC'}>Most Comments</option>
        <option value={'comment_count,ASC'}>Least Comments</option>
      </select>
    </form>
  );
}
