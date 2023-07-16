import axios from 'axios';
const { useState, useEffect } = require('react');

const instance = axios.create({
    baseURL : 'http://localhost:3004',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const useGetAllPositions = () => {
    const [positions, setPositions] = useState([]);
    useEffect(() => {
        const fetchPositions = async () => {
            try{
                const res = await instance.get('/positions');
                console.log(res.data);
                res.data.map((position)=>{
                    position.positionInfo.date = new Date(Date.parse(position.positionInfo.date));
                    position.interviews.map((interview) => {
                        interview.date = new Date(Date.parse(interview.date));
                    })
                })
                console.log(res.data);
                setPositions(res.data);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchPositions();
    }, []);
    return positions;
}

export const usePostNewPosition = (position) => {
    const [newPosition, setNewPosition] = useState(null);
    useEffect(() => {
        const postNewPosition = async() => {
            try{
                const res = await instance.post('/positions', JSON.stringify(position));
                console.log(res.data);
                console.log(res.status);
                setNewPosition(res.data);
            }
            catch(error){
                console.error(error);
            }
        }
        postNewPosition();
    }, []);
    return newPosition;
}
