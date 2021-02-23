import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container,Row, Col, Card, Form, Button, Nav } from 'react-bootstrap'
import { LinkContainer as Link } from 'react-router-bootstrap'
import axios from 'axios'
class DisposisiUpdate extends Component {
    constructor(){
        super()
        this.state = {
            idSurat: '',
            noAgenda: '',
            noSurat: '',
            kepada: '',
            keterangan: '',
            statusSurat: '',
            tanggapan: '',
            user: [],
            dispo: []
        }
    }

    async componentDidMount(){
        let idSurat = this.props.location.pathname.slice(15)
        console.log(idSurat)
        await axios.get('/petugas')
            .then((res) => { 
                this.setState({
                user: res.data,
                idSurat: idSurat,
                })      
            })
        console.log(this.state.user)
        await axios.get(`/disposisi/${idSurat}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    dispo: res.data,
                    noAgenda: res.data.noAgenda,
                    kepada: res.data.kepada,
                    keterangan: res.data.keterangan,
                    statusSurat: res.data.statusSurat,
                    tanggapan: res.data.tanggapan
            })
        })
        this.checkUser()
    }

    checkUser = () => {
        if(this.state.user){
            this.setState({isLoggedIn: true})
        }else{
            this.setState({isLoggedIn: false})
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handlePost = (e) => {
        e.preventDefault()
        let data = {
            noAgenda: this.state.noAgenda,
            kepada: this.state.kepada,
            keterangan: this.state.keterangan,
            statusSurat: this.state.statusSurat,
            tanggapan: this.state.tanggapan,
        }
        axios.put(`/disposisi/update/${this.state.idSurat}`, data)
            .then(() => window.location.href = '/Howry/Archive' )
    }

    render() {
        return(
            <div>
                <Container>
                <Card className="m-5" >
                                <Card.Title className="m-4">
                                    <h1 className='display-3'>Update Disposisi</h1>
                                </Card.Title>
                                <Form onSubmit={this.handlePost} className='m-4'>
                                    <Form.Group controlId="jenisSurat">
                                        <Form.Label>No Agenda</Form.Label>
                                        <Form.Control type='number'  name='noAgenda' onChange={this.handleChange} value={this.state.noAgenda}/>
                                        <Form.Text className='text-muted'>{this.state.noAgenda}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="kepada">
                                        <Form.Label>Kepada</Form.Label>
                                        <Form.Control type='text'  name='kepada' onChange={this.handleChange} value={this.state.kepada}/>
                                        <Form.Text className='text-muted'>{this.state.kepada}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="keterangan">
                                        <Form.Label>Keterangan</Form.Label>
                                        <Form.Control type='text'  name='keterangan' onChange={this.handleChange} value={this.state.keterangan}/>
                                        <Form.Text className='text-muted'>{this.state.keterangan}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="statusSurat">
                                        <Form.Label>Status Surat</Form.Label>
                                        <Form.Control type='text' name='statusSurat' onChange={this.handleChange} value={this.state.statusSurat}/>
                                        <Form.Text className='text-muted'>{this.state.statusSurat}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="tanggapan">
                                        <Form.Label>Tanggapan</Form.Label>
                                        <Form.Control type='text'  name='tanggapan' onChange={this.handleChange} value={this.state.tanggapan}/>
                                        <Form.Text className='text-muted'>{this.state.tanggapan}</Form.Text>
                                    </Form.Group>
                                    <Row style={{width: '500px'}}>
                                        <Col>
                                            <Button variant='dark' type="submit">Update</Button>
                            <Link to='/Howry/archive'>
                                    <Nav.Link>Balik</Nav.Link>
                                </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                                <hr style={{marginBottom: 50, borderColor: 'transparent'}}/>
                    </Container>
            </div>
        )
    }
}

export default DisposisiUpdate