import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataRepo, fetchDataUsers } from './app/dslice';
import './index.css';
import {Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';


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
        <Container fluid>
            <Container>
            <Col className="mb-5">
                <h3 className="text-center mb-3">Github Account Finder</h3>
                <Input type="text" className="input-search" onChange={e => setUsers(e.target?.value)} value={users} placeholder="Search here..."/>
            </Col>
            <Col>
                {load ? (
                    <h1 class="text-center">Loading</h1>
                ) : error ? (
                    <h1 class="text-center">{error?.message}</h1>
                ) : (
                <Row>
                    <Col>
                        <Card body className="mb-4">
                            <Col>
                                <Row>
                                    <Col md="4">
                                        <Card className="h-100 text-center mx-auto">
                                            <img src={profile?.avatar_url} alt="userphoto"/>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <CardTitle tag="h3" className="mb-0">
                                            {profile?.name}
                                        </CardTitle>
                                        <CardText className="mb-0">
                                            {profile?.login}
                                        </CardText>
                                        <CardText>
                                            <i>{profile?.location}</i>
                                        </CardText>
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
                    
                        <Card className="h-25">
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
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card body className="text-center">
                            <CardText>The portofolio</CardText>
                            <CardText>{profile?.followers}</CardText>
                            <CardTitle tag="h5">
                                Followers
                            </CardTitle>
                            <CardText>{profile?.following}</CardText>
                            <CardTitle tag="h5">
                                Following
                            </CardTitle>
                            <CardText>{profile?.public_repos}</CardText>
                            <CardTitle tag="h5">
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
