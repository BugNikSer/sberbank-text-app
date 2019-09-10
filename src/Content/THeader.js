import React, {Component} from 'react'
import {connect} from 'react-redux';

class THeader extends Component {
    render() {
        return (
            <thead>
                <tr key={'keys1'}>
                    {
                        Object.keys(this.props.people[0]).map(k =>
                            typeof this.props.people[0][k] == 'object'
                            ?
                            <th 
                                key={'key-' + k} 
                                colSpan={Object.keys(this.props.people[0][k]).length.toString()}
                            >{k}</th>
                            :
                            <th rowSpan={2} key={'key-' + k}>
                                <div>
                                    <div
                                        className={this.getSortBtnClass(k, null)}
                                        onClick={() => this.props.setKeysAscDesc(this, k, null)}>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <span>{k}</span> 
                                </div>
                            </th>
                        )
                    }
                </tr>
                <tr key={'keys2'}>
                    {
                        Object.keys(this.props.people[0]).map(k => 
                            typeof this.props.people[0][k] == 'object'
                            &&
                            Object.keys(this.props.people[0][k]).map(kk =>
                                <th key={'key2-' + kk}>
                                    <div>
                                        <div
                                            className={this.getSortBtnClass(k, kk)}
                                            onClick={() => this.props.setKeysAscDesc(this, k, kk)}>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <span>{kk}</span>                                        
                                    </div>
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>
        )
    }

    getSortBtnClass = (key, key2) => {
        let myClass = 'Sort ';

        if (this.props.selectedKey === key && this.props.selectedKey2 === key2) {
            if (this.props.isSortByAscending)
                myClass += 'Sort_Ascending';
            else
                myClass += 'Sort_Descending';
        }
        else myClass += 'Sort_NotSelected';

        return myClass;
    }

}

export default connect(
    state => ({
        people: state.people,
        selectedKey: state.selectedKey,
        selectedKey2: state.selectedKey2,
        isSortByAscending: state.isSortByAscending
    }),
    dispatch => ({
        setKeysAscDesc: (ths, key, key2) => {
            if (ths.props.selectedKey === key && ths.props.selectedKey2 === key2) {
                //this.setState({isSortByAscending: !this.props.isSortByAscending})
                dispatch({
                    type: 'SET_KEYS',
                    payload: {
                        key: key,
                        key2: key2,
                        isAscending: !ths.props.isSortByAscending
                    }
                });
            }
            else {
                //this.setState({selectedKey: key, selectedKey2: key2, isSortByAscending: true});
                dispatch({
                    type: 'SET_KEYS',
                    payload: {
                        key: key,
                        key2: key2,
                        isAscending: true
                    }
                });
            }
        }
    })
)(THeader);