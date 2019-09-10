import React from 'react'
import './Loading.css'

export default function LoadingContent() {
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