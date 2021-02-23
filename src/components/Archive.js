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
            suratM: [],
            suratK: [],
            search: '',
        }
    }

    async componentDidMount(){
        console.log(this.props.location.pathname)
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
        e.preventDefault()
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
            window.location.href = '/Howry/archive'
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
                suratM: res.data
            })})
        await axios.get(`/suratkeluar`)
            .then((res) => {
                this.setState({
                suratK: res.data
        })})
            console.log(this.state.suratM)
            console.log(this.state.suratK)
    }

    logout = () => {
        axios.get('/petugas/logout')
            .then(() => this.setState({ user: [], isLoggedIn: false }))
    }

    handleSearch = (e) => {
        e.preventDefault()
        if(this.state.search){
            axios.get(`/suratmasuk/search/${this.state.search}`)
                .then((res) => this.setState({
                    suratM: res.data
                }))
        }else{
            this.getArchives()
        }
    }

    handleDelete = (id) => {
        axios.delete(`/suratmasuk/delete/${id}`)
        this.getArchives()
    }

    handleDelete2 = (id) => {
        axios.delete(`/suratkeluar/delete/${id}`)
        this.getArchives()
    }

    render() {
        let url = `smupdate/update/`
        let url2 = `disposisi/`
        let url3 = `skupdate/update/`
        let masukAdmin = this.state.suratM.map(item => <li style={{listStyle:'none'}} key={item._id}>
            <h3>Surat Masuk</h3>No Agenda : {item.noAgenda}<br/>No Surat : {item.noSurat} <br/> Tanggal : {item.tanggalKirim } - {item.tanggalTerima} <br/> Perihal : {item.perihal} <br/> Pengirim : {item.pengirim.namaDepan} {item.pengirim.namaBelakang} <br/> <br/> <Link to={url + item._id}><Button className="mr-2">edit</Button></Link><Button onClick={() => this.handleDelete(item._id)} className="mr-2" variant="danger">delete</Button><Link to={url2 + item._id}><Button variant="success" className="mr-2">disp</Button></Link> <br/><br/>
        </li>);
        let keluarAdmin = this.state.suratK.map(item => <li style={{listStyle:'none'}} key={item._id}>
            <h3>Surat Keluar</h3>No Agenda : {item.noAgenda}<br/>No Surat : {item.noSurat} <br/> Tanggal Kirim : {item.tanggalKirim }  <br/> Perihal : {item.perihal} <br/> Pengirim : {item.pengirim.namaDepan} {item.pengirim.namaBelakang} <br/> <br/> <Link to={url3 + item._id}><Button className="mr-2">edit</Button></Link><Button onClick={() => this.handleDelete2(item._id)} className="mr-2" variant="danger">delete</Button>
        </li>);
        let masukUser = this.state.suratM.map(item => <li style={{listStyle:'none'}} key={item._id}>
            <h3>Surat Masuk</h3>No Agenda : {item.noAgenda}<br/>No Surat : {item.noSurat} <br/> Tanggal : {item.tanggalKirim } - {item.tanggalTerima} <br/> Perihal : {item.perihal} <br/> Pengirim : {item.pengirim.namaDepan} {item.pengirim.namaBelakang} <br/><br/>
        </li>);
        let keluarUser = this.state.suratK.map(item => <li style={{listStyle:'none'}} key={item._id}>
            <h3>Surat Keluar</h3>No Agenda : {item.noAgenda}<br/>No Surat : {item.noSurat} <br/> Tanggal Kirim : {item.tanggalKirim } <br/> Perihal : {item.perihal} <br/> Pengirim : {item.pengirim.namaDepan} {item.pengirim.namaBelakang} <br/><br/>
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
        }else if(this.state.user.hak === 'admin'){
            return(
                <div>
                    <Container>
                            <Col className="m-5">
                                <h1>Hello, {this.state.user.namaDepan} {this.state.user.namaBelakang}</h1>
                                <a href='#' onClick={this.logout}>Log out</a>
                                <br/><br/>
                            <Link to='/Howry/suratmasuk'>
                                <Nav.Link>Tambah Surat Masuk</Nav.Link>
                            </Link>
                            <Link to='/Howry/suratkeluar'>
                                <Nav.Link>Tambah Surat Keluar</Nav.Link>
                            </Link>
                            <h3>All archives from users : </h3>
                            <Form onSubmit={this.handleSearch}>
                                <Form.Group className="mb-2" controlId="archive">
                                    <Row>
                                        <Col>
                                        <Form.Control type="name" name="search" placeholder="Search Archive Number" onChange={this.handleChange}/>
                                        </Col>
                                        <Col>
                                        <Button variant="dark" type="submit">Search</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                            <br/>
                            {masukAdmin}
                            {keluarAdmin}
                            </Col>
                            <hr style={{marginBottom: 150}}/>
                    </Container>
                </div>
            )
        }else if(this.state.user.hak === 'user'){
            return(
                <div>
                    <Container>
                            <Col className="m-5">
                                <h1>Hello, {this.state.user.namaDepan} {this.state.user.namaBelakang}</h1>
                                <a href='#home' onClick={this.logout}>Log out</a>
                                <br/><br/>
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
                            {masukUser}
                            {keluarUser}
                            </Col>
                            <hr style={{marginBottom: 150}}/>
                    </Container>
                </div>
            )
        }
    }
}

export default Archive