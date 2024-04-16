import './FooterButton.styles.css';

type Props = {
  title: string;
};

function FooterButton({ title }: Props) {
  return <button className="footerbutton">{title}</button>;
}

export default FooterButton;
