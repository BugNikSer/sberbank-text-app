import React, {Component} from 'react'
import './Loading.css'
import { connect } from 'react-redux';

class LoadingContent extends Component {
    render() {
    console.log(0)
        return(
            <div className="Loading">
                <div className="Loading_Text">Loading data from server</div>
                <div className="Loading_Glasses_Container">
                    <div className="Loading_Glasses"></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
            
        )
    }

    componentDidMount() {
        fetch('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
        .then(data => {
            return data.json()
        })
        .then(res => {this.props.getPeople(res)})
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        getPeople: (people) => {
            dispatch({type: 'GET_PEOPLE', payload: people})
        },
    })
)(LoadingContent)

// export default function LoadingContent() {
    
//     return(
//         <div className="Loading">
//             <div className="Loading_Text">Loading data from server</div>
//             <div className="Loading_Glasses_Container">
//                 <div className="Loading_Glasses"></div>
//             </div>
//             <div>
//                 <div></div>
//             </div>
//         </div>
        
//     )
// }