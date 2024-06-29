import '@/assets/style/components/section.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';
export default function Section({ title, Icon, line, children }) {
  return (
    <div className="section">
      <h3 className={cn('section__title', line && 'line')}>
        <span className="section__icon">
          <Icon />
        </span>
        {title}
      </h3>

      <div className="section__main">{children}</div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  line: PropTypes.bool,
  children: PropTypes.element,
};
