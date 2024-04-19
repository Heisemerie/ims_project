const button = document.querySelector(".request");
const dialog = document.querySelector(".success");
const errorDialog = document.querySelector(".error-dialog");

button.addEventListener("click", () => {
  getLocation();
});

const getLocation = () => {
  const geoLocation = navigator.geolocation;

  geoLocation.getCurrentPosition(
    (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      requestFireServiceTruck({ latitude, longitude });
    },
    (error) => {
      console.log("ERROR_LOCATION", error);
      const message = "Enable location access to get a response team";
      errorDialog.innerHTML = message;
      errorDialog.classList.remove("error-dialog-hidden");
      setTimeout(() => {
        errorDialog.classList.add("error-dialog-hidden");
      }, 5000);
    },
  );
};

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
