import './BlockHeader.styles.css';

type Props = {
  title: string;
};

function BlockHeader({ title }: Props) {
  return (
    <div className="block-header-title">
      {title} /<span className="text-small"> Information</span>
    </div>
  );
}

export default BlockHeader;
