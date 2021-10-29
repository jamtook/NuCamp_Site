import React, { Component } from 'react';
import {Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { postComment } from '@babel/types';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function  RenderCampsite({campsite}){
    {console.log("RenderCampsite()")}
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card> 
        </div>
    );
}

function  RenderComments({comments, postComment, campsiteId}) {
    {console.log("comment: ", postComment)};
    if(comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', 
                                month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                {console.log("above CommentForm Component ", comments)};
                <CommentForm campsiteId={campsiteId} postComment={postComment} />  
                {console.log("below CommentForm Component ", comments)};-----------------------
            </div>
        );
    }
    return <div />
}


class CommentForm extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            isModalOpen: false
        };
        //bind the event handler to the component. It ensures that when  is called, 'this' keyword
        //inside it refers correctly to the component
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    toggleModal () {
        {console.log("toggleModal()")}
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        });
    }

    handleSubmit(values) {
        console.log("handleSubmit")
        this.toggleModal()
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text)
        console.log("hS: ", values.author, values.text);
    }

 
    render(){
        {console.log("CF render()")}
        return (
            <div >
                <Button outline onClick={this.toggleModal} >
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)} >
                                <div className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author" >Author</Label>
                                    <Control.text model=".author" id="author" name="author"
                                            placeholder="Author"
                                            className="form-control"
                                            validators={{ 
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                </div>
                                <div  className="form-group">
                                    <Label htmlFor="text" md={2}>Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                            placeholder="Speak your mind"
                                            rows="6"
                                            className="form-control"
                                    />
                                </div>
                                <Button type="submit" color="primary"> 
                                    Submit
                                </Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </div>
        );
        
    }
}

//if you click on a picture, this is where it gets rendered
function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
        {console.log("top CampsiteInfo()")}
        if(props.campsite){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory"></Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                           
                            postComment={props.postComment}
                            campsiteId={props.campsiteId}
                            comments={props.comments} 
                         
                        />
                    
                    </div>
                </div>
            );
        }
            return    <div />

    }

   


export default CampsiteInfo;