import React, { useState } from 'react';
import firebase from '../../firebase';
import 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';

const Trips = () => {
  const [carNumber, setCarNumber] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passengers, setPassengers] = useState('');

  const handleCarNumberChange = (event) => {
    setCarNumber(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handlePassengersChange = (event) => {
    setPassengers(event.target.value);
  };

  const handleCreateTrip = async () => {
    const trip = {
      carNumber,
      from,
      to,
      passengers,
      createdAt: firebase.firestore.Timestamp.now(),
    };

    try {
      await firebase.firestore().collection('trips').add(trip);
      alert('Trip created successfully!');
    } catch (error) {
      console.error('Error creating trip: ', error);
      alert('Error creating trip');
    }
  };

  return (
    <div>
      <h2>Create a Trip</h2>
      <Form>
        <Form.Group>
          <Form.Label>Car Number:</Form.Label>
          <Form.Control
            type="text"
            value={carNumber}
            onChange={handleCarNumberChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>From:</Form.Label>
          <Form.Control type="text" value={from} onChange={handleFromChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>To:</Form.Label>
          <Form.Control type="text" value={to} onChange={handleToChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Passengers:</Form.Label>
          <Form.Control
            type="text"
            value={passengers}
            onChange={handlePassengersChange}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleCreateTrip}>Create Trip</Button>
      </Form>
    </div>
  );
};

export default Trips;
