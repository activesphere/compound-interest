import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="pb3 shadow-2">
        <nav className="cf pt3 mw7 center flex flex-wrap items-center">
          <div className="fl w-100 w-third-ns pl4-ns pa2 pa0-ns tc tl-ns">
            <a className="dib b f3 lato" href="/">
              <img alt="ActiveSphere" src="/public/images/logo_text.svg" />
            </a>

            <span id="logo"> </span>
          </div>

          <div className="fl w-100 w-two-thirds-ns pt2 pr4-ns pt0-ns tc tr-ns">
            <a
              className="pa2 link dim dib f5 lato as-blue ttc dn dib-ns"
              href="/"
            >
              home
            </a>
            <a
              className="pa2 link dim dib f5 lato as-blue ttc"
              href="/hacks.html"
            >
              hacks
            </a>
            <a
              className="pa2 link dim dib f5 lato as-blue ttc"
              href="/portfolio.html"
            >
              portfolio
            </a>
            <a
              className="pa2 link dim dib f5 lato as-blue ttc"
              href="/people.html"
            >
              people
            </a>
            <a
              className="pa2 link dim dib f5 lato as-blue ttc"
              href="/careers.html"
            >
              careers
            </a>
            <a
              className="pa2 link dim dib f5 lato as-blue ttc"
              href="/blog.html"
            >
              blog
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
