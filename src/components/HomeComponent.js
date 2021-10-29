import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    return (
        <Card>
             <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    console.log("Home props:", props);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    {/*we pass the featured campsite, promotion, and partner objects into Home from the Main
                    component and we retrieve those here using props.campsite/promotion/partner. So the featured
                    campsite object gets passed in here and then it gets passed to RenderCard which creates a card 
                    with all the properties from the featured campsite object, the img url, name, description, and 
                    same for the promotion and partners. */}
                     <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    );
}

export default Home;