import axios from 'axios';

export default class DetectorService {

    constructor() {

    }

    public async detectCats(params: FormData){
        return axios.post('https://flask-ml-apis.herokuapp.com/cat/detect', params)
    }
}