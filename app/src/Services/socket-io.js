import openSocket from 'socket.io-client';
const socket = openSocket('https://90c0b2bd.ngrok.io/');

socket.connect()
export default socket;