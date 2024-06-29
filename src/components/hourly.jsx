import '@/assets/style/components/slider.scss';
import PropType from 'prop-types';

Hourly.propTypes = {
  data: PropType.array,
  onClickCard: PropType.func,
};

HourlyCard.propTypes = {
  info: PropType.object,
};

export default function Hourly({ data = [], onClickCard }) {
  return (
    <swiper-container
      class="slider"
      slides-per-view="auto"
      scrollbar-hide="false"
      space-between="20"
    >
      {data.map((d, i) => {
        return (
          <swiper-slide
            key={i}
            class="slider__slide"
            onClick={() => onClickCard(d, data[i + 1])}
          >
            <HourlyCard info={d} />
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

function HourlyCard({ info }) {
  return (
    <div className="slide-card">
      <div className="slide-card__time">
        {new Date(info.dt_txt)
          .toLocaleTimeString()
          .split(':')
          .slice(0, 2)
          .join(':')}
      </div>
      <div className="slide-card__temperature">
        {info.main.feels_like.toFixed()}°
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`}
        alt=""
      />
      {/* <i className="slide-card__icon wu wu-256 wu-white wu-night wu-clear"></i> */}
    </div>
  );
}
