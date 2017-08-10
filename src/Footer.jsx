import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="light-gradient f5 shadow-3">
        <div className="center pa2 lh-copy mw7">
          <div className="cf pa3 flex flex-wrap justify-between items-center">
            <div className="w-100 w-50-ns">
              <div className="flex items-center dim pv2 pv0-ns">
                <i className="material-icons as-blue ph1">phone</i>
                <a className="as-blue link db" href="tel:+919980955066">
                  +91 8095221530{' '}
                  <span className="light-blue">
                    (
                    <span className="as-blue">ciju</span>
                    )
                  </span>
                </a>
              </div>
              <div className="flex items-center dim pv2 pv0-ns">
                <i className="material-icons as-blue ph1 f5">email</i>
                <a
                  className="as-blue link db"
                  href="mailto:contact@activesphere.com"
                >
                  contact@activesphere.com
                </a>
              </div>
            </div>

            <div className="w-100 w-50-ns flex items-center dim justify-end-ns pv2">
              <i className="material-icons as-blue ph1 f5">gps_fixed</i>
              <a
                className="as-blue link"
                href="https://goo.gl/maps/KEytEg7VH8k"
              >
                <div>1st Floor, 1216/17, 11th Cross,</div>
                <div>24th Main, HSR Sector 1, Bangalore</div>
              </a>
            </div>
          </div>

          <div className="tc pa3 black-60">
            © 2017 ActiveSphere Technologies{' '}
            <span className="nowrap">Private Ltd, Inc</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
