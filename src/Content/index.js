import React, {Component} from 'react';
import './Content.css'
import THeader from './THeader'
import TBody from './TBody'
import TFooter from './TFooter'

class Content extends Component {
    render() {
        return(
            <table className="Content_table">
                <THeader></THeader>
                <TBody></TBody>
                <TFooter></TFooter>
            </table>
        )
    }
}

export default Content;