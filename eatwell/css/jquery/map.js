function MsgGoogleMap(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p, w, b, k, d, g, nt, tt) {
    this._sId = n;
    this._inEltPh = document.getElementById(n);
    this._inEltMap = document.getElementById(n + "_mapi");
    this._inEltCall = document.getElementById(n + "_mapia");
    this._inEltNat = document.getElementById(n + "_mapn");
    this._inEltS = document.getElementById(n + "_maps");
    this._sAddr = t;
    this._iZ = i;
    this._mapTypeId = r;
    this._map = null;
    this._dst = null;
    this._geocoder = null;
    this._iPWidth = u;
    this._iLWidth = f;
    this._bIsDesignMode = e;
    this._heading = c;
    this._pitch = l;
    this._streetViewZoom = a;
    this._inEltPanorama = document.getElementById(n + "_panorama");
    this._panorama = null;
    this.load = function() {
        var t, i, r, u;
        google && google.maps && (t = this, this._inEltMap != null && (this._inEltMap.style.display = ""),
            this._inEltCall && (this._inEltCall.style.display = "none"),
            this._inEltS != null && (this._inEltS.style.display = "none"),
            this._inEltNat != null && (this._inEltNat.style.display = "none"),
            this._inEltPanorama != null && (this._inEltPanorama.style.display = ""),
            this.multipleAddresses = {
                "2": y,
                "3": p,
                "4": w,
                "5": b,
                "6": k,
                "7": d,
                "8": g,
                "9": nt,
                "10": tt
            },
            this.allValidMarkers = [], this._geocoder = new google.maps.Geocoder,
            i = {
                zoom: this._iZ,
                scrollwheel: !1,
                mapTypeId: this._mapTypeId
            },
            this._inEltMap !== null && (this._map = new google.maps.Map(this._inEltMap, i),
                window["collapseContainerGoogleMap_" + n] = this._map), this._inEltPanorama !== null &&
            (this._panorama = new google.maps.StreetViewPanorama(this._inEltPanorama),
                h === "streetViewSideBySide" &&
                (window["collapseContainerGoogleStreetViewSideBySide_" + n] = this._panorama)),
            v === "cordinates" ? (r = o != null ? o : 51.477222, u = s != null ? s : 0, this.latlng = new google.maps.LatLng(r, u), h === "normalMap" ?
                this.setMapCenterForCoordinats(this.latlng) : h === "streetView" ?
                this.setStreetViewForCoordinates(this.latlng) : h === "streetViewSideBySide" &&
                (this.setMapCenterForCoordinats(this.latlng),
                    this.setStreetViewForCoordinates(this.latlng))) :
            (v === "full" || v === "detailed") && (h === "normalMap" || h === "streetViewSideBySide" ?
                (this._geocoder.geocode({
                        address: this._sAddr
                    }, function(n, i) {
                        t.handleGeocode(n, i)
                    }),
                    v === "full" && this.checkMultipleAddressesArrayForGeocode()) : h === "streetView" && this._geocoder.geocode({
                    address: this._sAddr
                }, function(n, i) {
                    t.handleGeocodeForStreetView(n, i)
                })))
    };
    this.handleGeocode = function(n, t) {
        var i, r;
        t === google.maps.GeocoderStatus.OK ? (this._dst = n[0].geometry.location,
                this._map.setCenter(this._dst), i = "", this.getValidMultipleAddressesNumber(this.multipleAddresses) !== 0 &&
                (i = "1"), r = this.getGoogleMarker(this._dst, n[0].formatted_address, i), this.addMarkerToValidMarkersArray(r),
                h === "streetViewSideBySide" && this.setStreetViewForCoordinates(this._dst)) :
            (this.setMapErrorMessage(this._inEltMap), h === "streetViewSideBySide" &&
                this.setPanoramaErrorMessage(this._inEltPanorama))
    };
    this.handleGeocodeForStreetView = function(n, t) {
        t === google.maps.GeocoderStatus.OK ? this.setStreetViewForCoordinates(n[0].geometry.location) : this.setPanoramaErrorMessage(this._inEltPanorama)
    };
    this.setStreetViewForCoordinates = function(t) {
        var i = this,
            r = {
                heading: i._heading,
                pitch: i._pitch,
                zoom: i._streetViewZoom
            },
            u = new google.maps.StreetViewService;
        u.getPanoramaByLocation(t, 100, function(t, u) {
            u === google.maps.StreetViewStatus.OK ? (i._panorama = new google.maps.StreetViewPanorama(i._inEltPanorama, {
                position: t.location.latLng,
                pov: r
            }), h === "streetViewSideBySide" ? i._map.setStreetView(i._panorama) : h === "streetView" && (i._panorama.setPano(t.location.pano), i._panorama.setPov(r), i._panorama.setVisible(!0), window["collapseContainerGoogleStreetView_" + n] = i._panorama)) : i.setPanoramaErrorMessage(i._inEltPanorama)
        })
    };
    this.setMapCenterForCoordinats = function(n) {
        this._map.setCenter(n);
        this.getGoogleMarker(n, this.getLatLngString(n), "")
    };
    this.checkMultipleAddressesArrayForGeocode = function() {
        var n = this;
        $.each(this.multipleAddresses, function(t, i) {
            var r = t;
            i !== "" && setTimeout(function() {
                n._geocoder.geocode({
                    address: i
                }, function(t, i) {
                    n.handleGeocodeForMultipleAddresses(t, i, r)
                })
            }, 100)
        })
    };
    this.handleGeocodeForMultipleAddresses = function(n, t, i) {
        if (t === google.maps.GeocoderStatus.OK) {
            var r = this.getGoogleMarker(n[0].geometry.location, n[0].formatted_address, i);
            this.addMarkerToValidMarkersArray(r);
            this.setMapBoundsForMultipleAddresses(this.allValidMarkers)
        }
    };
    this.setMapBoundsForMultipleAddresses = function(n) {
        for (var i = new google.maps.LatLngBounds, t = 0; t < n.length; t++) i.extend(n[t].getPosition());
        this._map.fitBounds(i)
    };
    this.getGoogleMarker = function(n, t, i) {
        return new google.maps.Marker({
            map: this._map,
            position: n,
            animation: google.maps.Animation.DROP,
            title: t,
            label: i
        })
    };
    this.getLatLngString = function(n) {
        return "(" + n.lat() + " , " + n.lng() + ")"
    };
    this.addMarkerToValidMarkersArray = function(n) {
        this.allValidMarkers.push(n);
        this.setMarkerClickEvent(n)
    };
    this.setMarkerClickEvent = function(n) {
        var t = this;
        h === "streetViewSideBySide" && n.addListener("click", function() {
            t.setStreetViewForCoordinates(n.position)
        })
    };
    this.getValidMultipleAddressesNumber = function(n) {
        var i = this,
            t = 0;
        return $.each(n, function(n, i) {
            i !== "" && (t = t + 1)
        }), t
    };
    this.setPanoramaErrorMessage = function(n) {
        var t = n.firstChild;
        t.setAttribute("style", "color:#333; background-color:#666; text-align:center; overflow:hidden; position:absolute; left:0; right:0;");
        t.innerHTML = "Sorry, Google street view have no imagery in the the specific location";
        $(n).empty();
        $(n).css("background-color", "#666");
        $(n).append(t)
    };
    this.setMapErrorMessage = function(n) {
        var t = n.firstChild;
        t.setAttribute("style", "color:#222; background-color:#555; text-align:center; overflow:hidden; position:absolute; left:0; right:0;");
        t.innerHTML = "Sorry, the specific location could not be found in the map";
        $(n).empty();
        $(n).css("background-color", "#555");
        $(n).append(t)
    };
    this.orientationchange = function() {
        switch (msgOrientation) {
            case 90:
            case -90:
                this._inEltPh.style.width = this._iLWidth + "px";
                break;
            default:
                this._inEltPh.style.width = this._iPWidth + "px"
        }
        google.maps.event.trigger(this._map, "resize")
    }
}
