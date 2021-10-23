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

//get the state from Redux by setting up the below function(state is the argument)
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners, 
        promotions: state.promotions
    }
}
class Main extends Component {  
  
    render() {
        //locally scoped HomePage, only accesable inside MainComponent.js
        /*why arrow function? they inherit the this of their parent scope and 
        we can get the data from the main component state  */
        const HomePage = () => {
            return(
                <Home 
                    /*the 0 is for the array index to pull that object out of the array then
                     pass it to home component as props */
                    campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    /*the 0 is for the array index to pull that object out of the array */
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
                    
            )
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id ===
                    +match.params.campsiteId)[0]}
                    //with comments, we want the whole array not just a single comment so
                    //we dont have to use the zero index ([0]) here.  
                    comments={this.props.comments.filter(comment => comment.campsiteId ===
                    +match.params.campsiteId)} />
            )
        }
        return (
            <div> {/* */}
                <Header />   {/*Header class in HeaderComponent.js */}
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />}  />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
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

export default withRouter(connect(mapStateToProps)(Main));
