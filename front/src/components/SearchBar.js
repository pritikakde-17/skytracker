import React, { useState } from 'react';


export default function SearchBar({ onSearch }) {
const [val, setVal] = useState('');
return (
<div className="search-bar">
<input
placeholder="Enter city name (e.g. Delhi, India)"
value={val}
onChange={(e) => setVal(e.target.value)}
/>
<button onClick={() => onSearch(val)}>Search</button>
</div>
);
}