import React from 'react';


export default function AdvisoryBox({ advisories }) {
if (!advisories || advisories.length === 0) return null;
return (
<div className="advisory-box">
<h3>Farmer Advisories</h3>
<ul>
{advisories.map((a, i) => (
<li key={i}>{a}</li>
))}
</ul>
</div>
);
}