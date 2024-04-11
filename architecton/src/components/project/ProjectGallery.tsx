import './ProjectGallery.styles.css';

import assets from '../../assets';

function ProjectGallery() {
  return (
    <div className="project-gallery">
      <img src={assets.imagePunkGallery} />
      <img src={assets.imagePunkGallery} />
      <img src={assets.imagePunkGallery} />
      <img src={assets.imagePunkGallery} />
      <img src={assets.imagePunkGallery} />
      <img src={assets.imagePunkGallery} />
    </div>
  );
}

export default ProjectGallery;
