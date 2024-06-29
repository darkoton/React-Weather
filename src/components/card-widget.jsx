import PropTypes from 'prop-types';
import '@/assets/style/components/widget.scss';
export default function CardWidget({ Icon, title, value, subValue, text }) {
  return (
    <div className="widget">
      <span className="widget__title">
        <Icon className="widget__icon" />
        {title}
      </span>
      <div className="widget__value">
        <span className="widget__value-main">
          {typeof value == 'function' ? value() : value}
        </span>
        <span className="widget__value-sub">{subValue}</span>
      </div>

      <p className="widget__text">
        {' '}
        {typeof text == 'function' ? text() : text}
      </p>
    </div>
  );
}

CardWidget.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  subValue: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
