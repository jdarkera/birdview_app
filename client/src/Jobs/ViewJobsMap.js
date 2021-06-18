
import React, { Component, useState } from 'react';
import axios from 'axios';
import './ViewJobs.css'

import  { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps"
import Geocode from "react-geocode";

// var a = 49.278094;
// var b = -122.919883;

var all = [];
//var numJobs;

export default class ViewJobsMap extends Component {

  constructor(props) {
      super(props);

      this.state = {jobs: []};

      this.getJobs = this.getJobs.bind(this);
      this.printJobs = this.printJobs.bind(this);
      this.getJobs();

  }

  getJobs() {

    axios.get(`/jobs/viewJobs?companyName=${this.props.companyName}`)
      .then(res => {
        //console.log(res);
        all = [];
        //numJobs = res.data.length;
        this.printJobs(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  printJobs(jobs) {
    jobs.forEach((item,index) => {

      const jobTitle = item["jobTitle"];
      const companyName = item["companyName"];

      const address = item["location"].address;
      const city = item["location"].city;
      const province = item["location"].province;
      const finalString = address + ", " + city + ", " + province;

      var object = {
        jobTitle: jobTitle,
        companyName: companyName,
        address: finalString
      }

      Geocode.setApiKey("AIzaSyDrzf70J5QLoCv6t1YhCrZqNByoD_wmtUk");
      Geocode.setLanguage("en");
      Geocode.setRegion("ca");
      Geocode.enableDebug();
      Geocode.fromAddress(finalString).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            object["lat"] = lat;
            object["lng"] = lng;
            console.log(object);
            all.push(object);

        },
        error => {
            console.error(error);
        }

      );

    })

  }

  componentDidMount() {

    setTimeout(() => {
        this.setState({favoritecolor: "yellow"})
      }, 700);
  }

  render() {

    function Map() {

        const [selectedPark, setSelectedPark] = useState(null);

        return(
            <GoogleMap
              defaultZoom={10}
              defaultCenter={{lat: 49.191577, lng: -122.891006}}
            >
              {
                all.map((loc, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: loc.lat,
                        lng: loc.lng
                      }}
                      onClick={() =>{
                        setSelectedPark(loc);

                      }}
                    />
                  ))
              }

              {
                selectedPark && (
                  <InfoWindow
                    position={{
                      lat: selectedPark.lat,
                      lng: selectedPark.lng
                    }}
                    onCloseClick={() => {
                      setSelectedPark(null);
                    }}
                  >
                    <div>
                      <h4>{selectedPark.jobTitle}</h4>
                      <p>{selectedPark.companyName}</p>
                    </div>
                  </InfoWindow>
                )
              }




            </GoogleMap>
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    let componentToRender;

    componentToRender = (
        <div style={{width: '50vw', height: '65vh'}}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAf9PKvnalpIQ5WHg7LtjI3lbcjWGxUNBA`}
                loadingElement={<div style={{height: "100%"}}  />}
                containerElement={<div style={{height: "100%"}}  />}
                mapElement={<div style={{height: "100%"}}  />}
            />
            <br/>
        </div>
    );


    return (
        <React.Fragment>
            <div className="container">
              <h1>Active Jobs Map</h1><br />
                {componentToRender}
            </div>
        </React.Fragment>
    );
}
}
