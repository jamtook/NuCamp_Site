//We are turning the directoryComponent file into a presentation component
//file. it is not going to hold anymore state data.

import { nullableTypeAnnotation, tsConstructorType } from '@babel/types';
import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

//render each card with different campsite details. Destructured props argument
//and used {campsite, onClick}
 function RenderDirectoryItem({campsite}){
    //functional components all need a return statement
    return(
        <Card>
            <Link to={`/directory/${campsite.id}`}>
                <CardImg src={campsite.image} alt={campsite.name}/>
                <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
    </Card>
    );
 }  

function Directory(props) {
        const directory = props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                   <RenderDirectoryItem campsite={campsite} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home"></Link></BreadcrumbItem>
                            <BreadcrumbItem active>Directory</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="row">
                    {directory}
                </div>
           
            </div>
        );
  
}


export default Directory;