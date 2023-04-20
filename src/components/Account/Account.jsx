import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Account = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    email: '',
    role: '',
  });

  const fetchUserData = async () => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      const doc = await db.collection('users').doc(userId).get();

      if (!doc.exists) {
        const { uid, displayName, email } = firebase.auth().currentUser;
        await db.collection('users').doc(uid).set({
          fullName: displayName,
          age: '',
          phoneNumber: '',
          email: email,
          role: '',
        });
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
          const userDataFromFirestore = doc.data();
          setUserData(userDataFromFirestore);
        }
      }
    } catch (error) {
      setErrorMessage('Error when getting user data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection('users').doc(userId).update(userData);
      setSuccessMessage('User data updated successfully');

      // Optionally, you can fetch the updated user data and update the local state:
      const updatedDoc = await db.collection('users').doc(userId).get();
      const updatedUserData = updatedDoc.data();
      setUserData(updatedUserData);
    } catch (error) {
      setErrorMessage('Error while updating user data in Firestore:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                defaultValue={userData.displayName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="text"
                name="age"
                defaultValue={userData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                defaultValue={userData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                defaultValue={userData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role:</Form.Label>
              <Form.Control
                as="select"
                name="role"
                defaultValue={userData.role}
                onChange={handleInputChange}
              >
                <option value="">Select a role</option>
                <option value="driver">Driver</option>
                <option value="passenger">Passenger</option>
                <option value="dispatcher">Dispatcher</option>
              </Form.Control>
            </Form.Group>
            <Row className="justify-content-center">
              <Button variant="primary" type="submit" className="w-50 mt-3">
                Save
              </Button>
            </Row>
          </Form>

          <Row className="mt-3">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
