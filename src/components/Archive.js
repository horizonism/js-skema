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
            archive: '',
            isLoggedIn: false,
            user: {},
            userMsg: [],
            search: '',
        }
    }

    async componentDidMount(){
        await axios.get('/petugas')
            .then((res) => { this.setState({
                user: res.data
            }) 
            this.checkUser()
            this.getArchives()
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
        axios.post('/petugas/login/', data)
            .then(() => {
                axios.get('/petugas')
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
            .then(() => this.getArchives())
    }

    getArchives = async () => {
        await axios.get(`/suratmasuk`)
            .then((res) => {
                this.setState({
                userMsg: res.data
            })})
    }

    logout = () => {
        axios.get('/petugas/logout')
            .then(() => this.setState({ user: [], isLoggedIn: false }))
    }

    // handleSearch = (e) => {
    //     e.preventDefault()
    //     if(this.state.search){
    //         axios.get(`/archive/search/${this.state.search}`)
    //             .then((res) => this.setState({
    //                 userMsg: res.data
    //             }))
    //     }else{
    //         this.getArchives()
    //     }
    // }

    handleDelete = (id) => {
        axios.delete(`/suratmasuk/delete/${id}`)
        this.getArchives()
    }

    render() {
        let url = `smupdate/update/`
        let archive = this.state.userMsg.map(item => <li key={item._id}>
            No Agenda {item.noAgenda} dengan Perihal {item.perihal} dikirim oleh {item.pengirim.namaDepan} <Link to={url + item._id}><Button>edit</Button></Link><Button onClick={() => this.handleDelete(item._id)} variant="danger">delete</Button>
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
                            <Link to='/Howry/suratmasuk'>
                                <Nav.Link>Tambah Surat Masuk</Nav.Link>
                            </Link>
                            <h3>All archives from users : </h3>
                            <Form onSubmit={this.handleSearch}>
                                <Form.Group className="mb-2" controlId="archive">
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