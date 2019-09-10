import React, {Component} from 'react';
import {connect} from 'react-redux';

class TFooter extends Component {
    render() {
        return (
            <tfoot>
                <tr>
                    <td colSpan={10}>
                        <div>
                            <div
                                onClick={() => this.props.increaseDecreasePage(this.isIncreasePageBtnActive, this.isDecreasePageBtnActive, this.props.currentPageNumber, -1)}
                                className={'Pagination_Dec' + (!this.isDecreasePageBtnActive() ? ' Pagination_Inactive' : '')}>
                                <div></div>
                            </div>
                            <div>{'Page ' + this.props.currentPageNumber}</div>
                            <div
                                onClick={() => this.props.increaseDecreasePage(this.isIncreasePageBtnActive, this.isDecreasePageBtnActive, this.props.currentPageNumber, 1)}
                                className={'Pagination_Inc' + (!this.isIncreasePageBtnActive() ? ' Pagination_Inactive' : '')}>
                                    <div></div>
                                </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        )
    }

    isDecreasePageBtnActive = () => {
        return this.props.currentPageNumber > 1
    }

    isIncreasePageBtnActive = () => {
        return this.props.currentPageNumber < Math.ceil(this.props.people.length / this.props.showRowsOnPage)
    }
}

export default connect(
    state => ({
        people: state.people,
        currentPageNumber: state.currentPageNumber,
        showRowsOnPage: state.showRowsOnPage,
    }),
    dispatch => ({
        increaseDecreasePage: (isIncreasePageBtnActive, isDecreasePageBtnActive, currentPageNumber, n) => {
            if (
                (n === -1 && isDecreasePageBtnActive())
                ||
                (n === 1 && isIncreasePageBtnActive())
            )
            dispatch({
                type: 'SET_PAGE',
                payload: currentPageNumber + n
            })
        }
    })
)(TFooter)