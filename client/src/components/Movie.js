import React, { Component } from 'react'
import { Table, Button, Icon, Form, Input } from 'semantic-ui-react'
import BuildTable from './BuilTable'
import axios from '../config/axios';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

export class Movie extends Component {
    constructor() {
        super() 
        this.state = {
            movies: [],
            search: ''
        }
    }

    componentDidMount() {
        const url = '/movies'
        axios.get(url)
        .then(response => {
            console.log(response.data[0].actors)
            this.setState({ movies: response.data })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <MDBContainer className='pt-5'> 
                <MDBRow className='pb-4'>
                    <MDBCol>
                        <Form size='big'>
                            <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                placeholder='Find movies'
                                name='movieName'
                                onChange={(e) => {
                                    this.setState({ search: e.target.value })
                                }}
                            />
                        </Form>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="10">
                        <h2>Listing Movies </h2>
                    </MDBCol>
                    <MDBCol md="2"className='pl-5'>
                    <Button primary onClick={() => {
                        this.props.history.push('/add-movie')
                    }}> 
                        <Icon name='add' /> Movie
                    </Button>
                    </MDBCol>
                </MDBRow>
                <Table striped >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Poster</Table.HeaderCell>
                            <Table.HeaderCell>Movie Name</Table.HeaderCell>
                            <Table.HeaderCell>Year of Release</Table.HeaderCell>
                            <Table.HeaderCell>plot</Table.HeaderCell>
                            <Table.HeaderCell>Cast</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <BuildTable movies={this.state.movies} search={this.state.search}/>
                </Table>
            </MDBContainer>
        )
    }
}

export default Movie
