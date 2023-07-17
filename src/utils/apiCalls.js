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

export const usePostNewPosition = () => {
    const [newPosition, setNewPosition] = useState(null);
    const postNewPosition = async(position) => {
        try{
            const res = await instance.post('/positions', position);
            console.log(res.data);
            console.log(res.status);
            setNewPosition(res.data);
        }
        catch(error){
            console.error(error);
        }
    }
    return { postNewPosition, newPosition };
}

export const usePutNewPosition = () => {
    const [updatedPosition, setUpdatedPosition] = useState(null);
    const putPosition = async(position) => {
        try{
            const res = await instance.put(`/positions/${position.id}`, position);
            console.log(res.data);
            console.log(res.status);
            setUpdatedPosition(res.data);
        }
        catch(error){
            console.error(error);
        }
    }
    return { putPosition, updatedPosition };
}

export const useDeletePosition = () => {
    const[deletedPosition, setDeletedPosition] = useState(null);
    const deletePosition = async(position) =>{
        try{
            const res = await instance.delete(`/positions/${position.id}`, position);
            console.log(res.data);
            console.log(res.status);
            setDeletedPosition(res.data);
        }
        catch(error){
            console.error(error);
        }
    }
    return { deletePosition, deletedPosition };
}
