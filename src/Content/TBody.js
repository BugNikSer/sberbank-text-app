import React, {Component} from 'react';
import {connect} from 'react-redux'

class TBody extends Component {
    render() {
        return (
            <tbody>
                {
                    this.props.people.filter(person => {
                        return Object.keys(person).some(k => {
                            return person[k].toString().includes(this.props.filter)
                        })
                    }).sort(
                        (this.props.selectedKey2) ?
                            (a, b) => (
                                a[this.props.selectedKey][this.props.selectedKey2] > b[this.props.selectedKey][this.props.selectedKey2]
                                ?
                                ((this.props.isSortByAscending) ? 1 : -1)
                                :
                                ((this.props.isSortByAscending) ? -1 : 1)
                            )
                        :
                            (a, b) => (
                                a[this.props.selectedKey] > b[this.props.selectedKey]
                                ?
                                ((this.props.isSortByAscending) ? 1 : -1)
                                :
                                ((this.props.isSortByAscending) ? -1 : 1)
                            )
                    ).slice(
                        this.props.showRowsOnPage * (this.props.currentPageNumber - 1),
                        this.props.showRowsOnPage * (this.props.currentPageNumber)).map(person => 
                        <tr key={'person-' + person.id}>
                            {
                                Object.keys(person).map(p => 
                                        typeof person[p] == 'object' 
                                        ? 
                                        Object.keys(person[p]).map(pp => 
                                            <td key={'person-' + pp.toString() + '-' + person[p][pp]}>{person[p][pp]}</td>
                                        )
                                        :
                                        <td key={'person-' + p.toString() + '-' + person[p]}>{
                                            person[p].toString().slice(0, 50) + (person[p].toString().length > 50 ? '...' : '')
                                        }</td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        )
    }
}

export default connect(
    state => ({
        people: state.people,
        selectedKey: state.selectedKey,
        selectedKey2: state.selectedKey2,
        isSortByAscending: state.isSortByAscending,
        showRowsOnPage: state.showRowsOnPage,
        currentPageNumber: state.currentPageNumber,
        filter: state.filter
    }),
    dispatch => ({})
)(TBody)