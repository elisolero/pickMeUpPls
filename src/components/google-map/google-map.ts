import { Component, OnInit } from '@angular/core';
//import {} from '@types/googlemaps';
declare var google;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent implements OnInit {

  constructor() { }

    lat: number;
    lng: number;
    zoom:number;
    map:any;//error when trying to set type of google map-- probably typings

    directionsService:any;
    directionsDisplay:any;
    infowindow:any;
    infoWindowContent:string;
    distance:string;
    duration:string;
/*
    markers: marker[] = [
    {
      name: "comp 1",
      lat: this.lat + 0.01,
      lng: this.lng + 0.01,
      draggable: false
    },
    {
      name: "comp 2",
      lat: 31,
      lng: 31,
      draggable: false
    },
    {
      name: "comp 3",
      lat: 33,
      lng: 31,
      draggable: false
    },
  ]
*/

  ngOnInit() {
    this.distance = "0";
    this.duration = "0";

    this.setCurrentPosition();
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.infowindow = new google.maps.InfoWindow;
  }

  private setCurrentPosition() {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        var pos = {lat: this.lat, lng: this.lng};

        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: pos
        });

        var marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });

        var infoWindow = new google.maps.InfoWindow;
            infoWindow.setPosition(pos);
            infoWindow.setContent('You Are Here!');
            infoWindow.open(this.map);

            this.setCars();
      });
    }
  }

  private setCars(){

     let myPos = new google.maps.LatLng(this.lat,this.lng)
     var self =this;//used for scope

      var CarImage = {
        url: '../../assets/Car-icon.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
      };

      // Create markers.
      for (var index = 0; index < 7; index++) {
        let counter = index;
        //Algorithem to calculate Auto car position
        let numberLat = this.lat + this.getRandomArbitrary(-0.008,0.008);
        let numberLang =  this.lng + this.getRandomArbitrary(-0.008,0.008);

        //car position
        let carPos = {lat: numberLat, lng: numberLang};

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(numberLat,numberLang),
          icon: CarImage,
          map: this.map
        });

        //Set Info Window Content
        
        marker.addListener('click', function() {
          self.infowindow.setContent(
              '<div>' +
                '<strong>Car Number: ' + counter + '</strong><br>' +
                'Distance: ' + self.distance + '<br>' +
                'Duration: ' + self.duration + '<br>' +
              '</div>'
             );
          self.infowindow.open(this.map, marker);
        });

        marker.addListener('click', function() {
           self.setDirections(myPos,carPos);
        });
      }  
  }

  //Add directions service
  private setDirections(start,end){
      let self = this;

        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.addListener('directions_changed', function() {
          self.computeTotalDistance(self.directionsDisplay.getDirections());
        });

      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          self.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

    computeTotalDistance(result) {
      
        var total = 0;
        var myroute = result.routes[0];
        var duration = '';
        for (var i = 0; i < myroute.legs.length; i++) {
          duration = myroute.legs[i].duration.text;
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        this.distance = total + ' km';
        this.duration = duration;
        //document.getElementById('total').innerHTML = total + ' km';
      }

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}

interface marker{
  name?:string;
  lat:number;
  lng:number;
  draggable:boolean;
}

