import './Dropdown.styles.css';

import assets from '../../assets';

function Dropdown() {
  return (
    <>
      <div className="dropdown">
        <img src={assets.svgdots} alt="Menu" />
      </div>
    </>
  );
}

export default Dropdown;
