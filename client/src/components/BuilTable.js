import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export class BuilTable extends Component {
   
    render() {
        return (
                <Table.Body>
                    {this.props.movies.filter(movie => {
                        return movie.name.toLowerCase().includes(this.props.search.toLowerCase())
                        }).map(movie => {
                        return (
                            <Table.Row key={movie._id}>
                                <Table.Cell><img src={movie.poster} alt='Poster'/></Table.Cell>
                                <Table.Cell>{movie.name}</Table.Cell>
                                <Table.Cell>{movie.year}</Table.Cell>
                                <Table.Cell>{movie.plot}</Table.Cell>
                                <Table.Cell>{movie.actors.join(', ')}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                    
                </Table.Body>
        )
    }
}

export default BuilTable
