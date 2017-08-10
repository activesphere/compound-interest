import React from 'react';
import PersonalFinance from './PersonalFinance.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PersonalFinance />
        <Footer />
      </div>
    );
  }
}

export default App;
