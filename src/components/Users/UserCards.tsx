/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {ChangeEvent, FormEvent, useMemo, useState}from 'react';
import { updateJsxSpreadAttribute } from 'typescript';
import { IUser } from './interfaces';
import {USERS} from './users';
import http from "../../http";  
import AddUser from './AddUser';
import {useSearch} from '../../hooks/useSearch';
import SearchUser from './SearchUser';

const UserCards = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newUserId, setNewUserId] = useState<number>(USERS.length + 1);
    const deleteUser = async (id: number) => {
        const deleteUser = await http.delete(`/users/${id}`);
        if( deleteUser.status === 200){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const confirm = window.confirm('Do you want delete this user?');
        setUsers(users.filter(user => user.id !== id));
    }
    }
 
    const getAllUsers = async () =>{
        //Async await
        try{
           const responseData = await http.get('/users');
           //const postUsers = axios.post('https://jsonplaceholder.typicode.com/users')
           const users = responseData.data;
           setUsers(users); 
        } catch(err){
            alert(err);
        }
        //PROMISE
        //const usersData = axios.get('https://jsonplaceholder.typicode.com/users').then( res =>{
        //    console.log(res.data);
        //    setUsers(res.data);
        //}) 
    };
    
    return(
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <div>
            <h1 className='text-center w-100'>User cards</h1>

            <button className='btn btn-success m-5' onClick={() => getAllUsers()}>Get All Users</button>
            <button className='btn btn-success' onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user</button>
            {isShowEdit && <AddUser users={users} setUsers={setUsers}/>}
        </div>
        <div className="input-group mb-3">
            <SearchUser users={users}/>
            </div>
            {users.map(user => <div className="col" key={user.id}>
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{user.website}</p>
                        {/* {user?.company}
                        {user?.address} */}
                    </p>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-dark"
                  onClick={() => deleteUser(user.id)} >Delete this user</button>
                </div>
            </div>
            </div>
            )}
            
        </div>
    );
};

export default UserCards;
