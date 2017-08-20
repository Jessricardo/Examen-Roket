import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './logo1.png';
import Banner2 from './logo2.png';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item={
      display: 'inline-block',
      margin: '1%'
    }
    const selectedItem={
      display: 'inline-block',
      margin: '1%',
      borderBottom: '4px solid #f2f200'
    }
    const menu={
      width: '56%',
      display: 'inline-block',
      textAlign: 'right',
      verticalAlign: 'bottom'
    }
    const head={
      margin: '22px 0'
    }
    return (
       <section style={head}>
        <img src={Banner} />
        <img src={Banner2} />
        <article style={menu}>
          <div style={selectedItem}>
            home
          </div>
          <div style={item}>
            about
          </div>
          <div style={item}>
            news
          </div>
          <div style={item}>
            work
          </div>
          <div style={item}>
            clients
          </div>
          <div style={item}>
            contact
          </div>
        </article>
      </section>
    );
  }
}

export default Header;
