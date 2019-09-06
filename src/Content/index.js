import React, {Component} from 'react';
import './Content.css'

class Content extends Component {
    state= {
        selectedKey: Object.keys(this.props.data[0])[0],
        isIncrement: true
    }
    render() {
        const keys = Object.keys(this.props.data[0]).map(k => 
            <td key={k}>
                {
                    this.state.selectedKey === k ? 
                    <div>↑</div>
                    :
                    <div></div>
                }
                <div>{k}</div>
            </td>
        )

        return(
            <table className="Content_table">
                <thead>
                    <tr>
                        {keys}
                    </tr>
                </thead>
            </table>
        )
    }

    selectKey(key) {
        this.setState({
            selectedKey: key, 
            isIncrement: true
        });
    }
}

export default Content;