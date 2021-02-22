import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ghost from '../assets/ghost.png'
import { LinkContainer as Link } from 'react-router-bootstrap'

class Home extends Component {
    
    render(){
        return(
            <div>
            <Container>
                <br/><br/><br/>
                <Row>
                    <Col>
                    <br/><br/><br/><br/>
                    <h1 className='display-4' style={{fontWeight: 'bold'}}>An Archive System</h1>
                    <br/>
                    <h5 style={{wordSpacing: '8px'}} className='text-left'><span style={{fontSize: '28px'}}><b><i>for ghost</i></b></span>. i dont wanna waste my time if i can't be by your side<span style={{fontSize: '8px'}}> then hmu lol, im joking. unless...</span> </h5>
                    <br/>
                    <Link to='/Howry/Archive'>
                        <Button variant='outline-dark'>See all Archives</Button>
                    </Link>
                    <br/><br/>
                    </Col>
                    <Col className='d-none d-lg-block'>
                        <Image src={ghost} width={550}/>
                    </Col>
                </Row>
            </Container>

            </div>
        )
    }
}

export default Home