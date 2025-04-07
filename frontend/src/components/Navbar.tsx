import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar: React.FC = () => {
  return (
    <nav className="App-header">
      <Link to="/">
        <Button>首页</Button>
      </Link>
      <Link to="/about">
        <Button>关于</Button>
      </Link>
    </nav>
  );
};

export default Navbar;