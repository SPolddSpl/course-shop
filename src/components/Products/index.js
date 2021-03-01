import React, { useEffect, useState } from 'react';
import UserService from '../../services/user-service';
function Products() {
    const [filePath, setFilePath] = useState('');
    const [img, setImg] = useState('');
    const service = new UserService()
    useEffect(() => {
    }, []);

    function submitHandle() {
        service.getFile(filePath).then((res)=> {
            setImg(res);
        })
    }
    return (
        <>
            <input onChange={(e)=> {setFilePath(e.target.value)}} />
            <button onClick={submitHandle}>Click</button>
            <img src={`http://localhost:3000/files/${filePath}`}/>
        </>
    )
}


export default Products