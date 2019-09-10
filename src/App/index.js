import React, {Component} from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';
import './App.css';
import Filter from '../Filter'
import Content from '../Content'
import Loading from '../Loading'

class App extends Component {
    state = {
        data: null
    }
    render() {
        console.log(this.props.store)
        return (
            <div className="Main">
                <div className="Main_AppTitle">Sberbank Test App</div>
                {
                    this.props.store && this.props.store.people && this.props.store.people.length !== 0 
                    ?
                    <section>
                        <Filter></Filter>
                        <Content></Content>
                    </section>
                    : 
                    <Loading></Loading>
                }
            </div>
        );
    }

    componentDidMount() {
        this.getData().then(req => {
            this.props.getPeople(JSON.parse(req));
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
            false 
        );

        xmlHttp.send( null );

        return new Promise(resolve => {
            setTimeout(() => {resolve(xmlHttp.responseText)}, 2000)
            //resolve(xmlHttp.responseText)
        })
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        getPeople: (people) => {
            dispatch({type: 'GET_PEOPLE', payload: people})
        },
        setFilter: (filter) => {
            dispatch({type: 'SET_FILTER', payload: filter})
        }
    })
)(App);

// export default App;
