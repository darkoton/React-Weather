import SearchInput from '@/components/search';
import Card from '@/components/card';
import Section from '@/components/section';
import { WiTime4 } from 'react-icons/wi';
import { CiCalendar } from 'react-icons/ci';
import Hourly from '@/components/hourly';
import Forecast from '@/components/forecast';
import Wind from '@/components/wind';
import { useEffect, useState, useRef } from 'react';
import { getCitiesCoords, getWeatherOverview } from '@/utils/weather.js';
import { useSearchParams } from 'react-router-dom';

async function fetchImages(query) {
  const apiKey = 'AIzaSyC7l-iZQMIdot-cICCwtecdntfeA08Zr0s';
  const cx = '107c04c21fe494b38';
  const url = `https://www.googleapis.com/customsearch/v1?q=scenery photo ${query}&cx=${cx}&searchType=image&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0].link;
  } catch (error) {
    return null;
  }
}

export default function Home() {
  const [bg, setBg] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const firstSeachParams = useRef(searchParams);
  const [inputCity, setInputCity] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [coords, setCoords] = useState(null);
  const [info, setInfo] = useState(null);

  const [day, setDay] = useState([]);
  const [times, setTimes] = useState({
    current: null,
    next: null,
  });

  // get user coords
  useEffect(() => {
    let userCorrds = null;

    function getUserCoords() {
      return new Promise(res => {
        navigator.geolocation.getCurrentPosition(function (position) {
          userCorrds = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          res(userCorrds);
        });
      });
    }

    async function fetchData() {
      await getUserCoords();

      const query = {};
      for (const [key, value] of firstSeachParams.current.entries()) {
        query[key] = value;
      }

      if (query.city || (query.lon && query.lat)) {
        if (query.lon && query.lat) {
          setCoords({
            lat: query.lat,
            lon: query.lon,
          });
          return;
        } else if (query.city) {
          getCitiesCoords(query.city).then(cities => {
            if (!cities) {
              return;
            }

            let minDistance = Infinity;
            let indexClosest = null;
            cities.forEach((c, index) => {
              const distance = Math.sqrt(
                Math.pow(userCorrds.lat - c.lat, 2) +
                  Math.pow(userCorrds.lon - c.lon, 2),
              );

              if (distance < minDistance) {
                minDistance = distance;
                indexClosest = index;
              }
            });
            setCoords({
              lat: cities[indexClosest].lat,
              lon: cities[indexClosest].lon,
            });
          });
          return;
        }
        return;
      } else if (userCorrds) {
        setCoords({
          lat: userCorrds.lat,
          lon: userCorrds.lon,
        });
      }
    }

    fetchData();

    // flushSync(() => {
    //   setCoords({
    //     lat: userCorrds.lat,
    //     lon: userCorrds.lon,
    //   });
    // });
  }, []);

  // get overview weather by coords
  useEffect(() => {
    async function fetchData() {
      const result = await getWeatherOverview(coords);
      setInputCity(result.city.name);
      setInfo(result);
      setDay(result.list[0].data);
      setTimes({
        current: result.list[0].data[0],
        next: result.list[0].data[1] || null,
      });
      setSearchParams({
        city: result.city.name,
        ...coords,
      });
      fetchImages(result.city.name + ' ' + result.city.country).then(r => {
        setBg(r);
      });
    }

    if (coords) {
      fetchData();
    }
  }, [coords, setSearchParams]);

  // get coords city
  useEffect(() => {
    async function fetchData() {
      const result = await getCitiesCoords(inputCity);

      setSearchResult(result);
    }
    if (inputCity) {
      fetchData();
    }
  }, [inputCity]);

  function selectTime(v, next) {
    setTimes({ current: v, next: next || null });
  }

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${bg || '/React-Weather/bg.webp'})` }}
    >
      <div className="app__container _container">
        <div className="app__body">
          <div className="app__left">
            <SearchInput
              result={searchResult}
              value={inputCity}
              onChange={e => {
                setInputCity(e.target.value);
              }}
              onSelect={city => {
                setInputCity(city.name);
                setCoords({
                  lat: city.lat,
                  lon: city.lon,
                });
              }}
            />
            <Card info={times} />
          </div>
          {info && (
            <div className="app__right">
              <div className="app__group">
                <Section
                  {...{
                    line: true,
                    title: 'HOURLY FORECAST',
                    Icon: WiTime4,
                  }}
                >
                  <Hourly data={day} onClickCard={selectTime} />
                </Section>
              </div>

              <div className="app__group">
                <Section
                  {...{
                    line: true,
                    title: '6-DAY FORECAST',
                    Icon: CiCalendar,
                  }}
                >
                  <Forecast
                    onClickCard={v => {
                      setDay(v);
                      setTimes({
                        current: v[0],
                        next: v[1] || null,
                      });
                    }}
                    data={info.list}
                  />
                </Section>
              </div>

              <div className="app__group">
                <Wind info={times.current.wind} />
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
