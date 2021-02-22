import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, Form, Button,Nav } from 'react-bootstrap'
import { LinkContainer as Link } from 'react-router-bootstrap'
import axios from 'axios'
class Archive extends Component {
    constructor(){
        super()
        this.state = {
            noAgenda: '',
            jenisSurat: '',
            tanggalKirim: '',
            tanggalTerima: '',
            noSurat: '',
            perihal: '',
            username: '',
            password: '',
            message: '',
            isLoggedIn: false,
            user: {},
            userMsg: [],
            search: '',
        }
    }

    componentDidMount(){
        axios.get('/auth')
            .then((res) => { this.setState({
                user: res.data
            }) 
            this.checkUser()
            this.getMessages()
            this.errorCheck()
        })
    }

    checkUser = () => {
        if(this.state.user){
            this.setState({isLoggedIn: true})
        }else{
            this.setState({isLoggedIn: false})
        }
    }

    login = (e) => {
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/auth/login/', data)
            .then(() => {
                axios.get('/auth')
                .then((res) => {
                    this.setState({ 
                        username: '',
                        password: '',
                        user: res.data
                     })
                    this.checkUser()
                })
            })
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
            tanggalTerima: this.state.tanggalTerima,
            noSurat: this.state.noSurat,
            pengirim: this.state.user._id,
            perihal: this.state.perihal,
        }
        axios.post('/suratmasuk/new', data)
            .then(() => this.getMessages())
    }

    getMessages = () => {
        axios.get(`/suratmasuk`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                userMsg: res.data
            })})
    }

    logout = () => {
        axios.get('/auth/logout/')
            .then(() => this.setState({ user: [], isLoggedIn: false }))
    }

    handleSearch = (e) => {
        e.preventDefault()
        if(this.state.search){
            axios.get(`/message/search/${this.state.search}`)
                .then((res) => this.setState({
                    userMsg: res.data
                }))
        }else{
            this.getMessages()
        }
    }

    errorCheck = () => {
        console.log(this.state.user)
    }

    render() {
        let archive = this.state.userMsg.map(item => <li key={item._id}>
            No Agenda {item.noAgenda} dengan Perihal {item.perihal} dikirim oleh {item.pengirim.namaDepan}
        </li>);
        if(!this.state.isLoggedIn){
            return(
                <div>
                    <Container>
                        <br/><br/><br/><br/>
                        <Row>
                            <Col className='m-4'>
                                <Card className="m-5" >
                                    <Card.Title className="m-4">
                                        <h1 className='display-3'>Log In</h1>
                                    </Card.Title>
                                    <Form onSubmit={this.login} className='m-4'>
                                        <Form.Group controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type='name' placeholder='Enter Username' name='username' onChange={this.handleChange}/>
                                            <Form.Text className='text-muted'>{this.state.username}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type='password' placeholder='Enter Password' name='password' onChange={this.handleChange}/>
                                        </Form.Group>
                                        <Row style={{width: '300px'}}>
                                            <Col>
                                                <Button variant='dark' type='submit'>Submit</Button>
                                            </Col>
                                            <Col>
                                                <Link to='/Howry/signup'>
                                                    <Nav.Link>Sign Up?</Nav.Link>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                        <br/><br/><br/><br/>
                    </Container>
                </div>
            )
        }else{
            return(
                <div>
                    <Container>
                            <Col className="m-5">
                                <h1>Hello, {this.state.user.namaDepan} {this.state.user.namaBelakang}</h1>
                                <a href='#home' onClick={this.logout}>Log out</a>
                                <br/><br/>
                                <Card className="m-5" >
                                <Card.Title className="m-4">
                                    <h1 className='display-3'>Surat Masuk</h1>
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
                                    <Form.Group controlId="tanggalTerima">
                                        <Form.Label>Tanggal Terima</Form.Label>
                                        <Form.Control type='date' placeholder='Enter Date' name='tanggalTerima' onChange={this.handleChange} value={this.state.tanggalTerima}/>
                                        <Form.Text className='text-muted'>{this.state.tanggalTerima}</Form.Text>
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
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                            <h3>All messages from users : </h3>
                            <Form onSubmit={this.handleSearch}>
                                <Form.Group className="mb-2" controlId="message">
                                    <Row>
                                        <Col>
                                        <Form.Control type="name" name="search" placeholder="Search Name" onChange={this.handleChange}/>
                                        </Col>
                                        <Col>
                                        <Button variant="dark" type="submit">Search</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                            {archive}
                            </Col>
                            <hr style={{marginBottom: 150}}/>
                    </Container>
                </div>
            )
        }
    }
}

export default Archive