import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataRepo, fetchDataUsers } from './app/dslice';
import FinderLogo from './asset/finder-actors.png';
import './index.css';
import { Container, Row, Col, Card, CardHeader, CardBody, 
        CardTitle, CardText, Button, Input, InputGroup, 
        InputGroupText, Badge }         from 'reactstrap';
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import { faSearch, faLocationDot, 
        faUser }                        from '@fortawesome/free-solid-svg-icons'

function App() {
  const [users, setUsers] = useState("");
  // Get data
  const repos = useSelector(state => state?.repos);
  const {load, repositList, profile, error} = repos;
  console.log(repos);
  const dispatch =  useDispatch();
  useEffect(() => {
    dispatch(fetchDataRepo(users));
    dispatch(fetchDataUsers(users));
  },[users, dispatch]);

  
  return (
    <div>
        <Container>
            <Container>
            <Col md="6" className="mb-5 mx-auto my-5">
                <h3 className="text-center mb-2">Github Account Finder</h3>
                <footer class="blockquote-footer text-center ">by Bimo Putra Nugraha</footer>
                <center><img src={FinderLogo} alt="finder-pict" width="400px"/></center>
                <InputGroup className="input-search">
                    <Input type="text" className="input-search" onChange={e => setUsers(e.target?.value)} value={users} placeholder="Search here..."/>
                    <InputGroupText>
                        <FontAwesomeIcon icon={faSearch}/>
                    </InputGroupText>
                </InputGroup>
            </Col>
            <Col>
                {load ? (
                    <h1 class="text-center">Load Data....</h1>
                ) : error ? (
                    <h1 class="text-center">{error?.message}</h1>
                ) : (
                <Row>
                    <Col>
                        <Card body className="mb-4 side-left-top">
                            <Col>
                                <Row>
                                    <Col md="4">
                                        <Card className="h-100 text-center mx-auto my-auto border-0">
                                            <img src={profile?.avatar_url} alt="userphoto" className="my-auto rounded-circle"/>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <CardTitle tag="h3" className="mb-0">
                                            {profile?.name}
                                        </CardTitle>
                                        <CardText className="mb-0">
                                            <FontAwesomeIcon icon={faUser} />
                                            <span> {profile?.login}</span>
                                        </CardText>
                                        <CardText>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            <span className="text-italic"> {profile?.location}</span>
                                        </CardText>
                                        <hr/>
                                        <CardText className="text-justify">
                                            {profile?.bio}
                                        </CardText>
                                        <Button href={profile?.html_url} target="_blank" color="primary">
                                            Github View
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Card>
                    
                        <Card className="h-25 mb-4 side-left-bottom">
                            <CardHeader>
                                <CardTitle tag="h4" className="my-auto">
                                    List of Repository
                                </CardTitle>
                            </CardHeader>
                            <CardBody className="overflow-auto">
                                {repositList?.name !== "Error" && repositList?.map(reposit => (
                                    <div>
                                        <p>
                                            {reposit?.name}
                                        </p>
                                        <hr/>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3" className="mb-5">
                        <Card className="text-center side-right">
                            <CardHeader tag="h4" className="mb-4">The Summary</CardHeader>
                            <CardText className="mb-0"><Badge color="success" className="p-2">{profile?.followers}</Badge></CardText>
                            <CardTitle tag="h5" className="mb-5">
                                Followers
                            </CardTitle>
                            <CardText className="mb-0"><Badge color="success" className="p-2">{profile?.following}</Badge></CardText>
                            <CardTitle tag="h5" className="mb-5">
                                Following
                            </CardTitle>
                            <CardText className="mb-0"><Badge color="success" className="p-2">{profile?.public_repos}</Badge></CardText>
                            <CardTitle tag="h5" className="mb-5">
                                Repo Public
                            </CardTitle>
                        </Card>
                    </Col>
                </Row>
                )}
            </Col>
        </Container>
        </Container>
    </div>
  );
}

export default App;
