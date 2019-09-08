import React, {Component} from 'react';
import './Content.css'

class Content extends Component {
    state= {
        selectedKey: Object.keys(this.props.data[0])[0],
        selectedKey2: null,
        isSortByAscending: true,
        filter: '',
        showRowsOnPage: 5,
        currentPageNumber: 1
    }
    render() {
        const keys = 
        <thead>
            <tr 
                key={'keys1'}>
                {
                    Object.keys(this.props.data[0]).map(k =>
                        typeof this.props.data[0][k] == 'object'
                        ?
                        <th 
                            key={'key-' + k} 
                            colSpan={Object.keys(this.props.data[0][k]).length.toString()}
                            >{k}</th>
                        :
                        <th rowSpan={2} key={'key-' + k}>
                                <div
                                    className={this.getSortBtnClass(k, null)}
                                    onClick={() => this.filterByKey(k, null)}>
                                    <div></div>
                                    <div></div>
                                </div>
                            <div>{k}</div>
                        </th>
                    )
                }
            </tr>
            <tr key={'keys2'}>
                {
                    Object.keys(this.props.data[0]).map(k => 
                        typeof this.props.data[0][k] == 'object'
                        &&
                        Object.keys(this.props.data[0][k]).map(kk =>
                            <th key={'key2-' + kk}>
                                <div
                                    className={this.getSortBtnClass(k, kk)}
                                    onClick={() => this.filterByKey(k, kk)}>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div>{kk}</div>
                            </th>
                        )
                    )
                }
            </tr>
        </thead>

        const people = this.props.data.sort(
            (this.state.selectedKey2) ?
                (a, b) => (
                    a[this.state.selectedKey][this.state.selectedKey2] > b[this.state.selectedKey][this.state.selectedKey2]
                    ?
                    ((this.state.isSortByAscending) ? 1 : -1)
                    :
                    ((this.state.isSortByAscending) ? -1 : 1)
                )
            :
                (a, b) => (
                    a[this.state.selectedKey] > b[this.state.selectedKey]
                    ?
                    ((this.state.isSortByAscending) ? 1 : -1)
                    :
                    ((this.state.isSortByAscending) ? -1 : 1)
                )
        ).map(person => 
            <tr key={'person-' + person.id}>
                {
                    Object.keys(person).map(p => 
                            typeof person[p] == 'object' 
                            ? 
                            Object.keys(person[p]).map(pp => 
                                <td key={'person-' + pp.toString() + '-' + person[p][pp]}>{person[p][pp]}</td>
                            )
                            :
                            <td key={'person-' + p.toString() + '-' + person[p]}>{person[p].toString().slice(0, 100)}</td>
                    )
                }
            </tr>
        )

        return(
            <table className="Content_table">
                {keys}
                {/* <Header data={this.props.data}></Header> */}
                <tbody>
                    {people.slice(
                        this.state.showRowsOnPage * (this.state.currentPageNumber - 1),
                        this.state.showRowsOnPage * (this.state.currentPageNumber)
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={10}>
                            <div>
                                <div
                                    onClick={() => this.increaseDecreasePage(-1)}
                                    className={'Pagination_Dec' + (!this.isDecreasePageBtnActive() ? ' Pagination_Inactive' : '')}>
                                    <div></div>
                                </div>
                                <div>{'Page ' + this.state.currentPageNumber}</div>
                                <div
                                    onClick={() => this.increaseDecreasePage(1)}
                                    className={'Pagination_Inc' + (!this.isIncreasePageBtnActive() ? ' Pagination_Inactive' : '')}>
                                        <div></div>
                                    </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }

    getSortBtnClass = (key, key2) => {
        let myClass = 'Sort ';

        if (this.state.selectedKey === key && this.state.selectedKey2 === key2) {
            if (this.state.isSortByAscending)
                myClass += 'Sort_Ascending';
            else
                myClass += 'Sort_Descending';
        }
        else myClass += 'Sort_NotSelected';

        return myClass;
    }

    filterByKey = (key, key2) => {
        if (this.state.selectedKey === key && this.state.selectedKey2 === key2) {
            this.setState({isSortByAscending: !this.state.isSortByAscending})
        }
        else {
            this.setState({selectedKey: key, selectedKey2: key2, isSortByAscending: true});
        }
            
    }

    increaseDecreasePage = (n) => {
        if (
            (n === -1 && this.isDecreasePageBtnActive())
            ||
            (n === 1 && this.isIncreasePageBtnActive())
        )
        this.setState({
            currentPageNumber: this.state.currentPageNumber + n
        })
    }

    isDecreasePageBtnActive = () => {
        return this.state.currentPageNumber > 1
    }

    isIncreasePageBtnActive = () => {
        return this.state.currentPageNumber < Math.ceil(this.props.data.length / this.state.showRowsOnPage)
    }
}

export default Content;