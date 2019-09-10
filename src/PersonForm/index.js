import React, {Component} from 'react'
import {connect} from 'react-redux'
import './PersonForm.css'

class PersonForm extends Component {
    render() {
        return (
            <div className="PersonForm">
                <section>
                    <div className="PersonForm_Name">
                    {
                            this.props.person.firstName + ' ' +
                            this.props.person.lastName + ' (' +
                            this.props.person.id + ')'
                    }
                    </div>
                    <div onClick={this.props.deselectPerson} className="PersonForm_Deselect">X</div>
                </section>
                <section>
                    <article className="PersonForm_Info">
                        <section>
                            <div style={{'font-weight': 'bold'}}>Contacts:</div>
                            <div><u>Phone:</u> {this.props.person.phone}</div>
                            <div><u>E_mail:</u> {this.props.person.email}</div>
                        </section>
                        <section>
                            <div style={{'font-weight': 'bold'}}>Adress:</div>
                            <div>
                                {
                                    this.props.person.address.state + ', ' +
                                    this.props.person.address.city + ', ' +
                                    this.props.person.address.streetAddress + ', ' +
                                    this.props.person.address.zip
                                }
                            </div>
                        </section>
                    </article>
                    <article className="PersonForm_Description">{this.props.person.description}</article>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({
        person: state.selectedPersonId ? state.people.find(p => p.id === state.selectedPersonId) : null
    }),
    dispatch => ({
        deselectPerson: () => {
            dispatch({type: 'SELECT_PERSON', payload: null})
        }
    })
)(PersonForm)