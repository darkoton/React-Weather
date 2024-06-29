import { WiStrongWind } from 'react-icons/wi';
import PropType from 'prop-types';
import WindWidget from '@/components/wind-widget';
import Compass from '@/components/compass';
Wind.propTypes = {
  info: PropType.object,
};

export default function Wind({
  info = {
    speed: 0,
    deg: 0,
    gust: 0,
  },
}) {
  return (
    <div className="section">
      <div className="section__body">
        <div className="section__left">
          <h3 className="section__title">
            <span className="section__icon">
              <WiStrongWind />
            </span>
            WIND
          </h3>

          <div className="wind-widgets">
            <WindWidget title="Wind" value={info.speed} />
            <div className="section__line"></div>
            <WindWidget title="Gusts" value={info.gust} />
          </div>
        </div>
        <div className="section__right">
          <Compass deg={info.deg} />
        </div>
      </div>
    </div>
  );
}
