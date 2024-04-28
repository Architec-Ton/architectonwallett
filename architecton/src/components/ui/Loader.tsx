import assets from '../../assets';
import './Loader.styles.css';

import classNames from 'classnames';

type Props = {
  title: string;
};

function Loader({ title }: Props) {
  return (
    <div className={classNames('loader')}>
      <div>
        <h3>{title}</h3>
        <p>An Architec.TON Product</p>
      </div>
      <img src={assets.svgloader} />
    </div>
  );
}

export default Loader;
