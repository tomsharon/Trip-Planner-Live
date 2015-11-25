$(document).ready(function() {

	var map = initialize_gmaps();
	var mapCoordinates = [];
	

	$("#hotelAddButton").on("click", function() {
		//Below, val() chooses the current option selected by our <select>
		// console.dir($("#hotelDropdown select").val())
		//Alternatively, we can use the :selected pseudo-class of the #hotelDropdown, which chooses what has been selected within that particular dropdown
		var $selectedHotel = $("#hotelDropdown :selected").text();

		//We loop thru all_hotels, to find the object which has a name corresponding to $selectedHotel. We name it selectedHotelObject.
		var selectedHotelObject;
		for(var i = 0; i < all_hotels.length; i++) {
			if(all_hotels[i].name === $selectedHotel) {
				selectedHotelObject = all_hotels[i];
			}
		}

		//Latitude and Longitude:
		var selectedHotelLatLong = selectedHotelObject.place[0].location

		//Array of objects, where each object is {nameOfThing: [lat,long]}
		mapCoordinates.push({$selectedHotel: selectedHotelLatLong})

		drawLocation(map, selectedHotelLatLong, {icon: '/images/lodging_0star.png'}, $selectedHotel);


		$("#myHotel ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedHotel + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")

	})	


	$("#restaurantAddButton").on("click", function() {
		var $selectedRestaurant = $("#restaurantDropdown :selected").text();

		var selectedRestaurantObject;
		for(var i = 0; i < all_restaurants.length; i++) {
			if(all_restaurants[i].name === $selectedRestaurant) {
				selectedRestaurantObject = all_restaurants[i];
			}
		}

		var selectedRestaurantLatLong = selectedRestaurantObject.place[0].location

		mapCoordinates.push({$selectedRestaurant: selectedRestaurantLatLong})

		drawLocation(map, selectedRestaurantLatLong, {icon: '/images/restaurant.png'}, $selectedRestaurant);


		$("#myRestaurants ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedRestaurant + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")
	})

	$("#activitiesAddButton").on("click", function() {
		var $selectedActivity = $("#activitiesDropdown :selected").text();

		var selectedActivityObject;
		for(var i = 0; i < all_activities.length; i++) {
			if(all_activities[i].name === $selectedActivity) {
				selectedActivityObject = all_activities[i];
			}
		}

		var selectedActivityLatLong = selectedActivityObject.place[0].location

		mapCoordinates.push({$selectedActivity: selectedActivityLatLong})


		drawLocation(map, selectedActivityLatLong, {icon: '/images/star-3.png'}, $selectedActivity);

		$("#myActivities ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedActivity + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")
	})


	//Must select "REMOVE" on the panel-body, rather than adding a removingButton class to the new button we create (when adding a hotel,restaurant ,activity)
	//because otherwise we would be adding event listeners to elements that do not (yet) exist.
	$(".REMOVE").on("click", "button", function () {
		//this is a raw DOM element
		//$(this) is a jQuery object (with added jQuery functionality), representing this
		var $this = $(this);

		//Not using this approach:
		// var thingToRemove = mapCoordinates.filter(function (objectElement) {
		// 	return Object.keys(objectElement) === $this.siblings().text();
		// })[0];
		//    From above, we get back: {Hotel Ritz: [lat, long]}





		var thingToRemove = allTheMarkers.filter(function (objectElement) {
			//the name of the thing is in this.siblings().text() -- that is, the span next to the button we just clicked.
			return objectElement.name === $this.siblings().text();
		})[0];


		//Remove name of thing from itinerary on our webpage
		$this.parent().parent().remove();


		thingToRemove["marker"].setMap(null);
		// console.dir(allTheMarkers[0]);
		// allTheMarkers[0].setMap(null);
		// allTheMarkers.shift();
		//allTheMarkers = [marker1, marker2, marker3]
	})

	var count = 1;
	$("#ADD-DAY").on('click', function () {
		count += 1;
		var newDay = "<button class='btn btn-circle day-btn' style='margin-right: 4px'>" + count + "</button>"
		$("#existingDays").append(newDay)

		//append to this
		//change text
	})
})

























