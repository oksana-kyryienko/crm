import React, { useState } from 'react';
import firebase from '../../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationPage.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Введіть коректну електронну пошту');
        setShowAlert(true);
        return;
      }

      // Перевірка достатньої довжини введеного пароля
      if (password.length < 6) {
        setError('Пароль повинен містити принаймні 6 символів');
        setShowAlert(true);
        return;
      }
      // Створення нового користувача з використанням email та пароля
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Запис додаткових даних користувача в Firestore
      await firebase.firestore().collection('users').doc(email).set({
        email,
        // Додавання додаткових даних, наприклад: ім'я, вік, тощо
        name: '',
        age: '',
      });
      setShowAlert(false);
      // Перехід на екран користувача після успішної реєстрації
      navigate('/dashboard');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Помилка входу через Google:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Введіть електронну пошту"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="password"
                  placeholder="Введіть пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button className="mr-2 mb-2" onClick={handleRegister}>
                Реєстрація
              </Button>
            </Form>
            <Button className="mr-2 btn-google" onClick={handleGoogleSignIn}>
              <FaGoogle /> Реєстрація через Google
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationPage;

