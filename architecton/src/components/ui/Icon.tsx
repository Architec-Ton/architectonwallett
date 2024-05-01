type Props = {
  src: string;
  className?: string;
};

function Icon({ src, className }: Props) {
  return (
    <div className={`icon ${className}`}>
      <img src={src} />
    </div>
  );
}

export default Icon;
