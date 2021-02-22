import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Nav } from 'react-bootstrap'
import raihan from '../assets/raihan.jpg'

class About extends Component {
    render() {
        return(
            <div>
                <Container>
                    <br/><br/><br/><br/>
                    <Row>
                        <Col className='text-center'>
                            <h1 className='display-1'>About</h1>
                        </Col>
                    </Row>
                    <br/><br/><br/>
                    <br/><br/><br/>
                    <Row>
                        <Col className='text-center'>
                        <h5 className='text-muted'>Me</h5>
                        <p>Born in <i>Lumajang,</i> 18 years old.</p>
                        <Nav className='justify-content-center'>
                            <Nav.Link href='https://github.com/horizonism' target='_blank'>Github</Nav.Link>
                            <Nav.Link href='https://steamcommunity.com/id/horizonism' target='_blank'>Steam</Nav.Link>
                            <Nav.Link href='https://Instagram.com/raihanadf' target='_blank'>Instagram</Nav.Link>
                        </Nav>
                        </Col>
                        <Col className='text-center'>
                            <Image src={raihan} style={{width: '150px', height: '150px', objectFit: 'cover'}} roundedCircle/>
                        </Col>
                    </Row>
                    <br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </Container>
            </div>
        )
    }
}

export default About