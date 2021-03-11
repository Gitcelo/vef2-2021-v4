export async function fetchEarthquakes(type, period) {
  console.log('hæ');
  const url = `/proxy?period=${period}&type=${type}`;
  let result;
  try {
    result = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }
  
 // const data = await result.json();
  console.log(data);
  return data;
}
