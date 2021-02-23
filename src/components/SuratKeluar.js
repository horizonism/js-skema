import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Card, Form, Button, Nav } from 'react-bootstrap'
import { LinkContainer as Link } from 'react-router-bootstrap'
import axios from 'axios'
class SuratKeluar extends Component {
    constructor(){
        super()
        this.state = {
            noAgenda: '',
            jenisSurat: '',
            tanggalKirim: '',
            noSurat: '',
            perihal: '',
            message: '',
            isLoggedIn: false,
            user: {},
            userMsg: [],
            search: '',
        }
    }

    async componentDidMount(){
        let url = '/suratkeluar/' + this.props.location.pathname.slice(18)
        await axios.get('/petugas')
            .then((res) => { this.setState({
                user: res.data
            })
        })
        axios.get(url)
            .then((res) => this.setState({
                noAgenda: res.data.noAgenda,
                jenisSurat: res.data.jenisSurat,
                tanggalKirim: res.data.tanggalKirim,
                noSurat: res.data.noSurat,
                perihal: res.data.perihal,
            }))
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
            jenisSurat: this.state.jenisSurat,
            tanggalKirim: this.state.tanggalKirim,
            noSurat: this.state.noSurat,
            pengirim: this.state.user._id,
            perihal: this.state.perihal,
        }
        axios.post('/suratkeluar/new', data)
            .then(() => window.location.href = '/Howry/Archive' )
    }

    render() {
        return(
            <div>
                <Card className="m-5" >
                                <Card.Title className="m-4">
                                    <h1 className='display-3'>Surat Keluar</h1>
                                </Card.Title>
                                <Form onSubmit={this.handlePost} className='m-4'>
                                    <Form.Group controlId="noAgenda">
                                        <Form.Label>No Agenda</Form.Label>
                                        <Form.Control type='number' placeholder='Enter Nomor Agenda' name='noAgenda' onChange={this.handleChange} value={this.state.noAgenda}/>
                                        <Form.Text className='text-muted'>{this.state.noAgenda}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="jenisSurat">
                                        <Form.Label>Jenis Surat</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Jenis Surat' name='jenisSurat' onChange={this.handleChange} value={this.state.jenisSurat}/>
                                        <Form.Text className='text-muted'>{this.state.jenisSurat}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="tanggalKirim">
                                        <Form.Label>Tanggal Kirim</Form.Label>
                                        <Form.Control type='date' placeholder='Enter Date' name='tanggalKirim' onChange={this.handleChange} value={this.state.tanggalKirim}/>
                                        <Form.Text className='text-muted'>{this.state.tanggalKirim}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="noSurat">
                                        <Form.Label>No Surat</Form.Label>
                                        <Form.Control type='number' placeholder='Enter Nomor Surat' name='noSurat' onChange={this.handleChange} value={this.state.noSurat}/>
                                        <Form.Text className='text-muted'>{this.state.noSurat}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="perihal">
                                        <Form.Label>Perihal</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Nomor Surat' name='perihal' onChange={this.handleChange} value={this.state.perihal}/>
                                        <Form.Text className='text-muted'>{this.state.perihal}</Form.Text>
                                    </Form.Group>
                                    <Row style={{width: '500px'}}>
                                        <Col>
                                            <Button variant='dark' type="submit">Submit</Button>
                            <Link to='/Howry/archive'>
                                    <Nav.Link>Balik</Nav.Link>
                                </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                                <hr style={{marginBottom: 50, borderColor: 'transparent'}}/>
            </div>
        )
    }
}

export default SuratKeluar