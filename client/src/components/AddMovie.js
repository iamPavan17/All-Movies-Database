import React, { Component } from 'react'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import Select from 'react-select';
import Axios from 'axios';
import  { Redirect } from 'react-router-dom'
import {
    DateInput,
    YearInput
  } from 'semantic-ui-calendar-react';

export class AddMovie extends Component {
    constructor() {
        super() 
        this.state = {
            actors: [],
            name: '',
            year: '',
            plot: '',
            poster: null,
            actorsList: [],
            sent: false,
            openModal: false,
            artistName: '',
            artistDob: '',
            artistGender: '',
            artistAbout: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSelect(e) {
        // console.log(e);
        let actors = [];
        if(e) {
            actors = e.map(e => {
                return e.value
            })
        } else {
            e = [];
        }
        // console.log('Actors - ', actors)
        this.setState({ actors })
    }
    
    handleChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }

    handlefile = e => {
        // console.log(e.target.files[0])
        this.setState({ poster: e.target.files[0] })
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('poster',this.state.poster);
        formData.append('name', this.state.name);
        formData.append('year', this.state.year);
        formData.append('plot', this.state.plot);
        formData.append('actors', this.state.actors);

        let url = '/movies';
        Axios.post(url, formData)
        .then(response => {
            console.log('Data sent!!!')
            this.setState({ sent: true })
        }).catch(err => {
            console.log(err)
        });
    }

    handleNewArtistSubmit = e => {
        e.preventDefault()
        const url = '/actors';
        const formData = {
            name: this.state.artistName,
            sex: this.state.artistGender,
            dob: this.state.artistDob,
            bio: this.state.artistAbout
        }
        console.log(formData)
        Axios.post(url, formData) 
        .then(response => {
            this.setState(prevState => ({
                actorsList: [...prevState.actorsList, formData]
            }));
            this.setState({ openModal: false })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        let url = '/actors';
        Axios.get(url)
        .then(response => {
            this.setState({ actorsList: response.data })
        })
    }

    render() {
        let actors = [];
        this.state.actorsList.forEach(actor => {
            actors.push({value: actor.name, label: actor.name})
        });

        if(this.state.sent) {
            return <Redirect to='/movies' />
        }

        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' },
        ]

        return (
            <div className='container p-5 col-7'>
                <h2 className='pb-4'>Add New Movie</h2>
                <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Movie Name</label>
                            <input placeholder='Enter movie name' name='name' onChange={this.handleChange} required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Year of Release</label>
                            <YearInput name='year' placeholder='Year release' value={this.state.year} onChange={(event, {name, value}) => {
                                    if (this.state.hasOwnProperty(name)) {
                                        this.setState({ [name]: value });
                                    }
                            }}/>
                        </Form.Field> 
                    </Form.Group>
                    <Form.Field>
                        <label>Plot</label>
                        <textarea placeholder='Enter the Plot' rows='4' name='plot' onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Poster</label>
                        <input type='file' name='poster' onChange={this.handlefile} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Actors <Button className='ml-2' circular icon='add' onClick={(e) => {
                            e.preventDefault();
                            this.setState({ openModal: true })
                        }}/></label>
                    <Select
                        isMulti
                        name="actors"
                        options={actors}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Actors..."
                        required="true"
                        onChange={this.handleSelect}
                    />
                    </Form.Field>
                    <Button type='submit' className='mt-2' primary>Submit</Button>
                    <Button type='reset' primary onClick={() => {
                        this.props.history.push('/movies')
                    }}>Cancel</Button>
                </Form>
                
                {/* Modal for adding artist */}
                <div className='container p-5' >
                    <Modal size='tiny' dimmer='blurring' open={this.state.openModal} onClose={() => {
                        this.setState({ openModal: false })
                                }}>
                        <Modal.Header>Add Artist</Modal.Header>
                        <Modal.Content>
                        <Form onSubmit={this.handleNewArtistSubmit}>
                            <Form.Input fluid label='Name' name='artistName' placeholder='Artist name' required onChange={(e) => {
                                this.setState({ artistName: e.target.value })
                            }}/>
                            <Form.Select
                                fluid
                                name='artistGender'
                                label='Gender'
                                options={options}
                                placeholder='Gender'
                                required
                                onChange={(e, { value }) => {
                                    this.setState({ artistGender: value })
                                }}
                            />
                            <label>Date of Birth</label>
                            <DateInput
                                name="artistDob"
                                placeholder="DOB"
                                value={this.state.artistDob}
                                iconPosition="left"
                                onChange={(event, {name, value}) => {
                                    if (this.state.hasOwnProperty(name)) {
                                        this.setState({ [name]: value });
                                    }
                            }}
                            />
                            <Form.Field
                                control={TextArea}
                                label='About'
                                placeholder='Bio about the artist...'
                                required
                                name='artistAbout'
                                onChange={(e) => {
                                    this.setState({ artistAbout: e.target.value })
                                }}
                            />
                            <Modal.Actions>
                                <Button onClick={() => {
                                    this.setState({ openModal: false })
                                }}> Cancel</Button>
                                <Button type='submit' >Submit </Button>
                            </Modal.Actions>
                        </Form>
                        </Modal.Content>
                        
                    </Modal>    
                </div>
                            
            </div>
        )
    }
}

export default AddMovie
