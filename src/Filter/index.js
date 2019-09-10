import React, {Component} from 'react'
import {connect} from 'react-redux'

import './Filter.css'

class Filter extends Component {
    render() {
        return (
            <section className="Filter_section">
                <span>Filter:</span>
                <input id="filter_input" type="text"></input>
                <button onClick={this.props.setFilter}>Filter</button>
            </section>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        setFilter: () => {
            let val = document.getElementById('filter_input').value
            dispatch({type: 'SET_FILTER', payload: val})
        }
    })
)(Filter)