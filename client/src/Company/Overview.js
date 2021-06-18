import React, { Component } from 'react';
import './CompanyInfo.css';
import  { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";


var latitude, longitude;

export default class CompanyInfo extends Component {

    componentDidMount() {

        setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
          }, 700);
    }

    render() {
        const companyInfo = this.props.companyInfo;


        // cathan dont touch

        function assignGeo() {

            Geocode.setApiKey("AIzaSyDrzf70J5QLoCv6t1YhCrZqNByoD_wmtUk");
            Geocode.setLanguage("en");
            Geocode.setRegion("ca");
            Geocode.enableDebug();

            Geocode.fromAddress(companyInfo.headquarters).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    latitude = lat;
                    longitude = lng;
                },
                error => {
                    console.error(error);
                }
            );
        }

        assignGeo();

        function Map() {
            console.log("map called here");
            return(
                <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: parseFloat(latitude), lng: parseFloat(longitude)}}
                >
                <Marker
                position={{lat: parseFloat(latitude), lng: parseFloat(longitude)}}
                />
                </GoogleMap>
            );
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map));





        return (
            <React.Fragment>
                <div className="container" style={{width: '50vw', height: '50vh'}}>
                    <h3>Overview</h3>
                    <br/>
                    <table className="table table-borderless">
                    <tbody>
                        <tr className="overview-row">
                        <th>Website</th>
                        <td>{companyInfo.website}</td>
                        <th>Type</th>
                        <td>{companyInfo.type}</td>
                        </tr>
                        <tr className="overview-row">
                        <th>Size</th>
                        <td>{companyInfo.size}</td>
                        <th>Headquarters</th>
                        <td>{companyInfo.headquarters}</td>
                        </tr>
                        <tr className="overview-row">
                        <th>Founded</th>
                        <td>{companyInfo.founded}</td>
                        <th>Industry</th>
                        <td>{companyInfo.industry}</td>
                        </tr>
                    </tbody>
                    </table>
                    <br/>
                    <hr/>
                    <h5>About</h5>
                    <p>{this.props.companyInfo.about}</p>
                    <hr/>

                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAf9PKvnalpIQ5WHg7LtjI3lbcjWGxUNBA`}
                        loadingElement={<div style={{height: "100%"}}  />}
                        containerElement={<div style={{height: "100%"}}  />}
                        mapElement={<div style={{height: "100%"}}  />}
                    />
                    <br/>



                </div>
            </React.Fragment>
        );
    }
}
