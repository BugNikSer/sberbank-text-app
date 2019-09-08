import React, {Component} from 'react'

class Header extends Component {
    render() {
        return (
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
        )

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
    }
}

export default Header;