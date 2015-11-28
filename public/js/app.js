$(document).ready(function() {

	var map = initialize_gmaps();
	var activitiesFromAllDays = []

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

		//draw location on Google Map:
		drawLocation(map, selectedHotelLatLong, {icon: '/images/lodging_0star.png'}, $selectedHotel);

		//Append the item onto the appropriate <ul>:
		$("#myHotel ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedHotel + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")

		//Store info on this activity for later:
		activitiesFromAllDays.push({day: +$("#day-title").text().slice(-1), type: "hotel", name: $selectedHotel, latLong: selectedHotelLatLong, icon: {icon: '/images/lodging_0star.png'}, listItem: "<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedHotel + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>"})

		//Note:
		//+$("#day-title").text().slice(-1) is the current day (i.e. Day 2)

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

		drawLocation(map, selectedRestaurantLatLong, {icon: '/images/restaurant.png'}, $selectedRestaurant);

		$("#myRestaurants ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedRestaurant + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")
	
		activitiesFromAllDays.push({day: +$("#day-title").text().slice(-1), type: "restaurant", name: $selectedRestaurant, latLong: selectedRestaurantLatLong, icon: {icon: '/images/restaurant.png'}, listItem: "<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedRestaurant + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>"})

		//Note:
		//+$("#day-title").text().slice(-1) is the current day (i.e. Day 2)

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

		drawLocation(map, selectedActivityLatLong, {icon: '/images/star-3.png'}, $selectedActivity);

		$("#myActivities ul").append("<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedActivity + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>")
	
		activitiesFromAllDays.push({day: +$("#day-title").text().slice(-1), type: "activity", name: $selectedActivity, latLong: selectedActivityLatLong, icon: {icon: '/images/star-3.png'}, listItem: "<li>" + "<div class='itinerary-item'>" + "<span class='title'>" + $selectedActivity + "</span>" + "<button class='btn btn-xs btn-danger remove btn-circle removingButton'>x</button>" + "</div>" + "</li>"})

		//Note:
		//+$("#day-title").text().slice(-1) is the current day (i.e. Day 2)

	})


	//Must select "REMOVE" on the panel-body, rather than adding a removingButton class to the new button we create (when adding a hotel,restaurant ,activity)
	//because otherwise we would be adding event listeners to elements that do not (yet) exist.
	$(".REMOVE").on("click", "button", function () {
		//this is a raw DOM element
		//$(this) is a jQuery object (with added jQuery functionality), representing this
		var $this = $(this);


		//allTheMarkers was created in maps.js to keep track of all the markers (and the names of the thing they marked) for future removal

		var thingToRemove = allTheMarkers.filter(function (objectElement) {
			//the name of the thing is in this.siblings().text() -- that is, the span next to the button we just clicked.
			return objectElement.name === $this.siblings().text();
		})[0];


		//Remove name of thing from itinerary on our webpage
		$this.parent().parent().remove();

		//marker.setMap(null) is how we remove markers from a Google Map
		thingToRemove.marker.setMap(null);

	})


	var count = 1;
	$("#ADD-DAY").on('click', function () {

		count += 1;

		var newDay = "<button id='newDayIAdded' class='btn btn-circle day-btn' style='margin-right: 4px'>" + count + "</button>"
		
		$("#existingDays").append(newDay)

	})

	//Below I was trying to make new day buttons light up when clicked. 
	//However, this approach would have never worked, because what I effectively
	//did was add a listener on all the .day-btns that existed at the time of this script running.
	//That is, new day buttons didn't exist when I registered this listener. That's why it wasn't working.
	//I can't listen on elements that I add to the DOM. I need to listen to their parents. 

	// $(".day-btn").on("click", function() {
	// 	console.log("Listening correctly")
	// 	if(!$(this).is("#ADD-DAY")) {
	// 		if(!$(this).hasClass("current-day")) {
	// 			console.log("Is 2 working?")
	// 			$(this).css("background-color", "red")
	// 			$(".current-day").removeClass("current-day")
	// 			$(this).addClass("current-day")
	// 		}
	// 		else {
	// 			$(".current-day").removeClass("current-day")
	// 		}
	
	// 	}
	// })
	

	//Given the above, this approach should work:
	//When switching days:
	$("#existingDays").on("click", ".day-btn", function() {

		//If the day you're clicking on isn't the current day
		if(!$(this).hasClass("current-day")) {
			//remove the current-day class from the previous current-day
			$(".current-day").removeClass("current-day")
			//apply that class to this day, which is the new current day
			$(this).addClass("current-day")
		}

		//change the day-title appropriately, to reflect what day we are on
		$("#day-title").text("Day " + $(this).text());


		// activitiesFromAllDays has all the info we need both to
		// add things back into the itinerary list, and render them again on the map.

		//It has the activity type (hotel, restaurant, activity)

		//It has an itinerary <li>, which we can append back onto the appropriate <ul>

		//Plus, it has the activity's latLong, icon, and name,
		// which is exactly what we need to drawLocation() 


		//Note:
		//+$("#day-title").text().slice(-1) is the current day (i.e. Day 2)



		//Get rid of all itinerary items
		$(".itinerary-item").remove()

		//Get rid of all markers
		allTheMarkers.forEach(function(objWithMarker) {
			objWithMarker.marker.setMap(null)
		})

		//**********

		//Loop thru all activities from all days
		for(var i = 0; i < activitiesFromAllDays.length; i++) {
			//if the day for a given activity corresponds to the current day we're on
			if(+$("#day-title").text().slice(-1) === activitiesFromAllDays[i].day) {
				//render that activity on our map
				drawLocation(map, activitiesFromAllDays[i].latLong, activitiesFromAllDays[i].icon, activitiesFromAllDays[i].name)
				//and append an <li> for that activity in the appropriate <ul>
				if(activitiesFromAllDays[i].type === "hotel") {
					$("#myHotel ul").append(activitiesFromAllDays[i].listItem)
				}
				if(activitiesFromAllDays[i].type === "restaurant") {
					$("#myRestaurants ul").append(activitiesFromAllDays[i].listItem)
				}
				if(activitiesFromAllDays[i].type === "hotel") {
					$("#myActivities ul").append(activitiesFromAllDays[i].listItem)
				}
			}
		}


		//activitiesFromAllDays is an array of objects, with each object representing one activity. 
		//That object for each activity contains the type of the activity, the name of the activity, its latLong, its map icon,
		//the day it corresponds to, as well as its HTML <li> to add it back in. 

		//This is all the info we need to re-render it on our map, and add it back into the appropraite <ul>
	
	})	
})

























