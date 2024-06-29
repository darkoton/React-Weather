import '@/assets/style/components/compass.scss';
import arrow from '@/assets/images/arrow-compass.svg';
import PropType from 'prop-types';

Compass.propTypes = {
  deg: PropType.number,
};

export default function Compass({ deg }) {
  return (
    <div className="compass">
      <div className="compass__layer compass__layer-1">
        <div className="compass__layer compass__layer-2">
          <div className="compass__directions">
            <span className="compass__direction compass__south">S</span>
            <span className="compass__direction compass__north">N</span>
            <span className="compass__direction compass__west">W</span>
            <span className="compass__direction compass__east">E</span>
          </div>

          <div
            className="compass__arrow"
            style={{ transform: `rotate(${deg ? deg : 0}deg)` }}
          >
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
