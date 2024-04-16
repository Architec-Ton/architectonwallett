import './BlockInfo.styles.css';

import classNames from 'classnames';

type Props = {
  icon: string;
  title: string;
  description: string;
};

function BlockInfo({ icon, title, description }: Props) {
  return (
    <div className={classNames('block-info')}>
      <img src={icon} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default BlockInfo;
