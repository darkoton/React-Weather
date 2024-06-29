import '@/assets/style/components/card.scss';
import Widget from '@/components/card-widget';
import { WiThermometer, WiRaindrop, WiHumidity } from 'react-icons/wi';
import { PiEye } from 'react-icons/pi';
import PropType from 'prop-types';
import weatherInfo from '@/data/weather.js';
import icons from '@/icons.json';

Card.propTypes = {
  info: PropType.shape({
    current: PropType.object,
    next: PropType.object,
  }),
};

export default function Card({
  info = {
    current: null,
    next: null,
  },
}) {
  if (!info.current) {
    return (
      <div className="card">
        <div className="card__empty">
          Enter the name of the city, country, region.
        </div>
      </div>
    );
  }
  const widgets = [
    {
      id: 1,
      Icon: WiThermometer,
      title: 'FEELS LIKE',
      value: `${info.current.main.feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: WiRaindrop,
      title: 'PRECIPIATION',
      value: () => {
        if ('rain' in info.current) {
          return info.current.rain['3h'].toFixed(1) + "''";
        } else if ('show' in info.current) {
          return info.current.show['3h'].toFixed(1) + "''";
        }

        return 0 + "''";
      },
      subValue: 'in last 3h',
      text: () => {
        let precipitation = null;

        if (info.next) {
          if ('rain' in info.next) {
            precipitation = info.next.rain['3h'].toFixed(1);
          } else if ('show' in info.next) {
            precipitation = info.next.show['3h'].toFixed(1);
          } else {
            precipitation = 0;
          }
        } else {
          precipitation = 0;
        }

        return `${precipitation}'' expected in next 3h`;
      },
    },
    {
      id: 3,
      Icon: PiEye,
      title: 'VISIBILITY',
      value: `${Number((info.current.visibility / 1000).toFixed(1))}km`,
    },
    {
      id: 4,
      Icon: WiHumidity,
      title: 'HUMIDITY',
      value: `${info.current.main.humidity}%`,
    },
  ];

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__temperature">
          <img
            className="card__icon"
            src={icons[info.current.weather[0].icon]}
            alt=""
          />
          {`${info.current.main.temp.toFixed()}°`}
        </div>

        <div className="card__status">
          {weatherInfo[info.current.weather[0].description].title}
        </div>

        <div className="card__advice">
          {weatherInfo[info.current.weather[0].description].description(
            info.current.main.feels_like.toFixed(),
          )}
        </div>
      </div>
      <div className="card__widgets">
        {widgets.map(w => (
          <Widget className="card__widget" key={w.id} {...w} />
        ))}
      </div>
    </div>
  );
}
