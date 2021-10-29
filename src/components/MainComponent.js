//This container components "sits below the App component" 
//The presentation content, the visual content is here. 

import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';   
import Header from './HeaderComponent';
import Footer from './FooterCompont';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';

//setting up mapDispatchToProps this way makes it easy for us to dispatch actions to the redux store
const mapStateToProps = state => {
   return {
       campsites: state.campsites,
       comments: state.comments,
       partners: state. partners,
       promotions: state.promotions
   }
};

//fetchCampsites is an arrow function w no arguments and its calling the fetchCampsites()
//action creator. Now this fetchCampsites action creator is avaliable to the 
//MainComponent as props.
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {  

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }
  
    render() {
        //locally scoped HomePage, only accesable inside MainComponent.js
        /*why arrow function? they inherit the this of their parent scope and 
        we can get the data from the main component state  */
        const HomePage = () => {
            return(
                <Home 
                    /*the 0 is for the array index to pull that object out of the array then
                    //pass it to home component as props */
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
                    
            )
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />   
            )
        }
        return (
            <div> {/* */}
                <Header />   {/*Header class in HeaderComponent.js */}
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />}  />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route
                        exact 
                        path='/aboutus'
                        render={() => <About partners={this.props.partners} />}  //replaced state with props
                        />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}
//putting mapDispatchToProps in here has postComment, ActionCreators.js function 
//available inside the main component as a prop 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
