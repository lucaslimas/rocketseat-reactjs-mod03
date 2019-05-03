import Axios from 'axios';

const gitHub = Axios.create({
  baseURL: 'http://api.github.com',
});

export default gitHub;
