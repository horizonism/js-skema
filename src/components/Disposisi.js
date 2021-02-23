import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container,Row, Col, Card, Form, Button, Nav } from 'react-bootstrap'
import { LinkContainer as Link } from 'react-router-bootstrap'
import axios from 'axios'
class Disposisi extends Component {
    constructor(){
        super()
        this.state = {
            idSurat: '',
            noDisposisi: '',
            noAgenda: '',
            noSurat: '',
            kepada: '',
            keterangan: '',
            statusSurat: '',
            tanggapan: '',
            isLoggedIn: false,
            user: [],
            dispo: []
        }
    }

    async componentDidMount(){
        let idSurat = this.props.location.pathname.slice(17)
        await axios.get('/petugas')
            .then((res) => { 
                this.setState({
                user: res.data,
                idSurat: idSurat
            })
        })
        console.log(this.state.user)
        await axios.get('/disposisi')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    dispo: res.data
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
            noDisposisi: this.state.noDisposisi,
            noAgenda: this.state.noAgenda,
            noSurat: this.state.idSurat,
            kepada: this.state.kepada,
            keterangan: this.state.keterangan,
            statusSurat: this.state.statusSurat,
            tanggapan: this.state.tanggapan,
        }
        axios.post('/disposisi/new', data)
            .then(() => window.location.href = '/Howry/Archive' )
    }

    handleDelete = (id) => {
        axios.delete(`/disposisi/delete/${id}`)
            .then(() => window.location.href = '/Howry/Archive')
    }

    render() {
        let url = '/Howry/dupdate/'
        let dispo = this.state.dispo.map(item => <li style={{listStyle:'none', marginBottom: 30}} key={item._id}>
            No Agenda : {item.noAgenda} <br/>  No Surat : {item.noSurat.noSurat} <br/> Kepada : {item.kepada} <br/> Keterangan : {item.keterangan} <br/>Tanggapan : {item.tanggapan} <br/><br/> <Link to={url + item._id}><Button className="mr-2">edit</Button></Link><Button onClick={() => this.handleDelete(item._id)} className="mr-2" variant="danger">delete</Button>
        </li>);
        if(this.state.user){
        return(
            <div>
                <Container>
                <Card className="m-5" >
                                <Card.Title className="m-4">
                                    <h1 className='display-3'>Disposisi</h1>
                                </Card.Title>
                                <Form onSubmit={this.handlePost} className='m-4'>
                                    <Form.Group controlId="noAgenda">
                                        <Form.Label>No Disposisi</Form.Label>
                                        <Form.Control type='number' placeholder='Enter Nomor Disposisi' name='noDisposisi' onChange={this.handleChange} value={this.state.noDisposisi}/>
                                        <Form.Text className='text-muted'>{this.state.noDisposisi}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="jenisSurat">
                                        <Form.Label>No Agenda</Form.Label>
                                        <Form.Control type='number' placeholder='Enter Nomor Agenda' name='noAgenda' onChange={this.handleChange} value={this.state.noAgenda}/>
                                        <Form.Text className='text-muted'>{this.state.noAgenda}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="kepada">
                                        <Form.Label>Kepada</Form.Label>
                                        <Form.Control type='text' placeholder='Input Kepada' name='kepada' onChange={this.handleChange} value={this.state.kepada}/>
                                        <Form.Text className='text-muted'>{this.state.kepada}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="keterangan">
                                        <Form.Label>Keterangan</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Keterangan' name='keterangan' onChange={this.handleChange} value={this.state.keterangan}/>
                                        <Form.Text className='text-muted'>{this.state.keterangan}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="statusSurat">
                                        <Form.Label>Status Surat</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Status Surat' name='statusSurat' onChange={this.handleChange}/>
                                        <Form.Text className='text-muted'>{this.state.statusSurat}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="tanggapan">
                                        <Form.Label>Tanggapan</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Tanggapan' name='tanggapan' onChange={this.handleChange} value={this.state.tanggapan}/>
                                        <Form.Text className='text-muted'>{this.state.tanggapan}</Form.Text>
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
                            <h3>Disposisi</h3>
                            <br/>
                            {dispo}
                    </Container>
                                <hr style={{marginBottom: 150, borderColor: 'transparent'}}/>
            </div>
        )}else{
            window.location.href = '/Howry/Archive'
        }
    }
}

export default Disposisi