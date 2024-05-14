const button = document.querySelector(".request");
const dialog = document.querySelector(".success");
const errorDialog = document.querySelector(".error-dialog");
console.log(button);

//add event listener to emrgency button
button.addEventListener("click", function() {
  getLocation();
});

//get users location from geolocation api
const getLocation = () => {
  // const geoLocation = navigator.geolocation;

  try {
      // const latitude = position.coords.latitude;
      const latitude = 3.976386;
      // const longitude = position.coords.longitude;
      const longitude = 6.8638930;
      requestFireServiceTruck({ latitude, longitude });
  } catch (error) {
    console.log("ERROR_LOCATION", error);
    const message = "Enable location access to get a response team";
    errorDialog.innerHTML = message;
    errorDialog.classList.remove("error-dialog-hidden");
    setTimeout(() => {
      errorDialog.classList.add("error-dialog-hidden");
    }, 5000);
  }


  // geoLocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position);
  //     // const latitude = position.coords.latitude;
  //     const latitude = 3.976386;
  //     // const longitude = position.coords.longitude;
  //     const longitude = 6.8638930;
  //     requestFireServiceTruck({ latitude, longitude });
  //   },
  //   (error) => {
  //     console.log("ERROR_LOCATION", error);
  //     const message = "Enable location access to get a response team";
  //     errorDialog.innerHTML = message;
  //     errorDialog.classList.remove("error-dialog-hidden");
  //     setTimeout(() => {
  //       errorDialog.classList.add("error-dialog-hidden");
  //     }, 5000);
  //   },
  // );
};

//creates a request instance and displays success message
const requestFireServiceTruck = async (coordinates) => {
  try {
    const response = await fetch("/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coordinates),
    });
    const data = await response.json();
    const message = data?.message;
    if (!data || !message) {
      return;
    }
    console.log(data);
    dialog.innerHTML = message;
    dialog.classList.remove("dialog-hidden");
    setTimeout(() => {
      dialog.classList.add("dialog-hidden");
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
