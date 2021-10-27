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
import { addComment, fetchCampsites } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

//get the state from Redux by setting up the below function(state is the argument)
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners, 
        promotions: state.promotions
    }
}
//fetchCampsites is an arrow function w no arguments and its calling the fetchCampsites()
//action creator. Now this fetchCampsites action creator is avaliable to the 
//MainComponent as props.
const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
    resetFeedbackForm: () => (actions.reset('feedbackForm'))
};

class Main extends Component {  

    componentDidMount() {
        this.props.fetchCampsites();
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
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
                    
            )
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id ===
                    +match.params.campsiteId)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId ===
                    +match.params.campsiteId)} 
                    addComment ={this.props.addComment}
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
//putting mapDispatchToProps in here has mad addComment, ActionCreators.js function 
//available inside the main component as a prop 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
