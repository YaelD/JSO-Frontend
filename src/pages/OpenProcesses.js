import * as React from 'react';
import { useGetData } from '../utils/businessLogic';

export default function OpenProcesses(){

    const data = useGetData();
    if(!data){
        return(
            <>Nothing to show</>
        );
    }
    const {id, name} = data;

    return(
        <>
            <h1>Open Processes</h1>
            <div>id: {id}</div>
            <div>name: {name}</div>
        </>
    );
}