import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'

export class Artist extends Component {
    constructor() {
        super()
        this.state = {
            actors: [],
            movies: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/actors')
        .then(response => {
            this.setState({ actors: response.data })
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <div className='container pt-5'>
                <h2>Listing Artists - {this.state.actors.length}</h2>
                <Table striped >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Actor name</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>About</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.actors.map((actor, index) => {
                            return (
                                <Table.Row key={actor._id}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{actor.name}</Table.Cell>
                                    <Table.Cell>{actor.sex}</Table.Cell>
                                    <Table.Cell>{actor.dob}</Table.Cell>
                                    <Table.Cell>{actor.bio}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                        
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default Artist
