import fetcher from '@/axios/index.js';

export async function getCitiesCoords(city) {
  try {
    const response = await fetcher(`/geo/1.0/direct?q=${city}&limit=5`);
    return response.data;
  } catch {
    return null;
  }
}

export async function getWeatherOverview(coords) {
  try {
    const response = (
      await fetcher(
        `/data/2.5/forecast?units=metric&lat=${coords.lat}&lon=${coords.lon}`,
      )
    ).data;

    const dates = new Set();
    response.list.map(r => {
      dates.add(new Date(r.dt_txt).toLocaleDateString());
    });

    const result = {
      city: response.city,
      list: [],
    };

    dates.forEach(date => {
      result.list.push({
        date,
        data: response.list.filter(
          el => new Date(el.dt_txt).toLocaleDateString() === date,
        ),
      });
    });
    return result;
  } catch {
    return null;
  }
}
