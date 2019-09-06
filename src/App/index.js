import React, {Component} from 'react';
import './App.css';
import Content from '../Content'
import Loading from '../Loading'

// function httpGet(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }

class App extends Component {
  state = {
    data: null
  }
  render() {
    return (
      <div className="Main">
          <div className="Main_AppTitle">Sberbank Test App</div>
          <div className="Main_AppSignature">By Nikita Bugrov</div>
          {this.state.data ? <Content data={JSON.parse(this.state.data)}></Content> : <Loading></Loading>}
      </div>
    );
  }
  componentDidMount() {
    this.sendRequest().then(req => {
      this.setState({data: req})
    })
  }

  async getData() {
    return await this.sendRequest();
  }
  
  sendRequest() {
      var xmlHttp = new XMLHttpRequest();
  
      xmlHttp.open(
          'GET',
          'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
          false );
  
      xmlHttp.send( null );
  
      return new Promise(resolve => {
          resolve(xmlHttp.responseText)
      })
  }
}

export default App;
