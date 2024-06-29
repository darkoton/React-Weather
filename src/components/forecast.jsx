import PropType from 'prop-types';

Forecast.propTypes = {
  data: PropType.array,
  onClickCard: PropType.func,
};

ForecastCard.propTypes = {
  info: PropType.object,
};

export default function Forecast({ data = [], onClickCard }) {
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
            onClick={() => onClickCard(d.data)}
          >
            <ForecastCard info={d} />
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

function ForecastCard({ info }) {
  return (
    <div className="slide-card">
      <div className="slide-card__day">
        {info.date == new Date().toLocaleDateString()
          ? 'Today'
          : new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
              new Date(info.date.split('.').reverse().join('/')),
            )}
      </div>
      <div className="slide-card__date">
        {info.date.split('.').slice(0, 2).join('/')}
      </div>
      <div className="slide-card__temperature">
        {info.data[
          (info.data.length / 2).toFixed() - 1
        ].main.feels_like.toFixed(0)}
        °
      </div>
      {/* <i className="slide-card__icon wu wu-256 wu-white wu-night wu-clear"></i> */}
      <img
        src={`https://openweathermap.org/img/wn/${info.data[(info.data.length / 2).toFixed() - 1].weather[0].icon}.png`}
        alt=""
      />
    </div>
  );
}
