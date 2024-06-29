import '@/assets/style/components/wind-widget.scss';
import PropType from 'prop-types';

windWidget.propTypes = {
  title: PropType.string,
  value: PropType.number,
};

export default function windWidget({ title, value }) {
  return (
    <div className="wind-widget">
      <div className="wind-widget__value">{value}</div>
      <div className="wind-widget__right">
        <div className="wind-widget__measurement">MPH</div>
        <div className="wind-widget__title">{title}</div>
      </div>
    </div>
  );
}
