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
    const [isPositionsLoaded, setIsPositionsLoaded] = useState(false);
    useEffect(() => {
        const fetchPositions = async () => {
            try{
                const res = await instance.get('/positions');
                res.data.map((position)=>{
                    position.positionInfo.date = new Date(Date.parse(position.positionInfo.date));
                    position.interviews.map((interview) => {
                        interview.date = new Date(Date.parse(interview.date));
                    })
                })
                setPositions(res.data);
                setIsPositionsLoaded(true);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchPositions();
    }, []);
    return {positions, isPositionsLoaded};
}

export const usePostNewPosition = () => {
    const [newPosition, setNewPosition] = useState(null);
    const postNewPosition = async(position) => {
        try{
            const res = await instance.post('/positions', position);
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
            setDeletedPosition(res.data);
        }
        catch(error){
            console.error(error);
        }
    }
    return { deletePosition, deletedPosition };
}
