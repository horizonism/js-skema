import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, Form, Button,Nav } from 'react-bootstrap'
import { LinkContainer as Link } from 'react-router-bootstrap'
import axios from 'axios'
class Register extends Component {
    constructor(){
        super()
        this.state = {
            namaDepan: '',
            namaBelakang: '',
            username: '',
            password: '',
            passwordVerify: '',
        }
    }

    register = (e) => {
        e.preventDefault()
        if(this.state.username.length < 6 || this.state.password !== this.state.passwordVerify){
            this.setState({
                namaDepan: '',
                namaBelakang: '',
                username: '',
                password: '',
                passwordVerify: '',
            })
            alert(`Username is < 6 character Password Doesn't match`)
        }else{
            let data = {
                namaDepan: this.state.namaDepan,
                namaBelakang: this.state.namaBelakang,
                username: this.state.username,
                password: this.state.password,
            }
            axios.post('/auth/register', data)
                .then(() => window.location.href = '/Howry/Archive' )
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <div>
                <Container>
                    <br/><br/>
                    <Row>
                        <Col className='m-4'>
                            <Card className="m-5" >
                                <Card.Title className="m-4">
                                    <h1 className='display-3'>Register</h1>
                                </Card.Title>
                                <Form onSubmit={this.register} className='m-4'>
                                    <Form.Group controlId="namaDepan">
                                        <Form.Label>Nama Depan</Form.Label>
                                        <Form.Control type='name' placeholder='Enter Nama Depan' name='namaDepan' onChange={this.handleChange} value={this.state.namaDepan}/>
                                        <Form.Text className='text-muted'>{this.state.namaDepan}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="namaBelakang">
                                        <Form.Label>Nama Belakang</Form.Label>
                                        <Form.Control type='name' placeholder='Enter Nama Belakang' name='namaBelakang' onChange={this.handleChange} value={this.state.namaBelakang}/>
                                        <Form.Text className='text-muted'>{this.state.namaBelakang}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type='name' placeholder='Enter Username' name='username' onChange={this.handleChange} value={this.state.username}/>
                                        <Form.Text className='text-muted'>{this.state.username}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' placeholder='Enter Password' name='password' onChange={this.handleChange} value={this.state.password}/>
                                        <Form.Text className='text-muted'>{this.state.password}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="passwordVerify">
                                        <Form.Control type='password' placeholder='Enter Your Password Again' name='passwordVerify' onChange={this.handleChange} value={this.state.passwordVerify}/>
                                        <Form.Text className='text-muted'>{this.state.passwordVerify}</Form.Text>
                                    </Form.Group>
                                    <Row style={{width: '500px'}}>
                                        <Col>
                                            <Button variant='dark' type="submit">Submit</Button>
                                        </Col>
                                        <Col>
                                            <Link to='/Howry/login'>
                                                <Nav.Link>Already have an account?</Nav.Link>
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
    }
}

export default Register