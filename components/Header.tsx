import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Header;