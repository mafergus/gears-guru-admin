import firebase from 'datastore/database';
import store from 'datastore/store';

export function signOut() {
  firebase.auth().signOut()
  .then(() => store.dispatch({ type: "SIGN_OUT_USER" }))
  .catch(error => console.log("Error! ", error));
}

export function fetchGarage(garageId) {
  return firebase.database().ref('/garages/' + garageId).once('value')
  .then(snapshot => {
    if (snapshot.exists()) {
      const garage = snapshot.val();
      return garage;
    }
  })
  .catch(error => {
    console.log("Error fecthing garage: ", error);
  });
}

export function fetchCustomers(garageId) {
  return firebase.database().ref("/garages/" + garageId + "/customers").once("value")
  .then(snapshot => {
    console.log("Snapshot: ", snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  })
  .then(customers => {
    Object.keys(customers).forEach(key => {
      firebase.database().ref('customers/' + key).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("Got key: ", key);
          console.log("Got customer: ", snapshot.val());
          store.dispatch({ type: "ADD_CUSTOMER", customer: snapshot.val(), id: key });
        }
      })
      .catch(error => console.log("Error adding customer: ", error));
    });
  })
  .catch(error => {
    console.log("Error fetching customers: ", error);
  });
}