export async function fetchForecast(city) {
  const res = await fetch(`http://localhost:5000/weather?city=${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return await res.json();
}
