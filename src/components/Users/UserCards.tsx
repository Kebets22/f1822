/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {ChangeEvent, FormEvent, useMemo, useState}from 'react';
import { updateJsxSpreadAttribute } from 'typescript';
import { IUser } from './interfaces';
import {USERS} from './users';

const UserCards = () => {
    const initialValue ={
        name: '',
        username: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        website: '',
    }
    const [users, setUsers] = useState<IUser[]>([]);
    const [userValue, setUserValue] = useState<any>(initialValue);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newUserId, setNewUserId] = useState<number>(USERS.length + 1);
    const deleteUser = async (id: number) => {
        const deleteUser = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        if( deleteUser.status === 200){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const confirm = window.confirm('Do you want delete this user?');
        setUsers(users.filter(user => user.id !== id));
    }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchedUsers = useMemo(() =>{
        if(search){
            return users.filter(user => user.username.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return users;
    }, [search, users]);
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const field = event.target.id;
        const value = event.target.value;
        setUserValue({...userValue, [field]: value})
    }
    const addUser = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const responseData = await axios.post('https://jsonplaceholder.typicode.com/users', userValue);
        if(responseData.data){
            setUsers([...users, responseData.data]);
            setUserValue(initialValue);
        }
    }
    const getAllUsers = async () =>{
        //Async await
        try{
           const responseData = await axios.get('https://jsonplaceholder.typicode.com/users');
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
            {isShowEdit &&
                <form onSubmit={event => addUser(event)}>
                    {Object.keys(USERS[0]).map(field =>{
                    if(field ==="company" || field === "id" || field === 'address' ) return;
                     return <input className='form-control mt-2'
                        key={field}
                        required
                        id={field}
                        value={userValue[field]}
                        placeholder={`Input user ${field}`}
                        onChange={event => onChange(event)} />
                    }
                    )}
                    <button className='btn btn-success mt-2' type='submit'>Add user</button>
                </form>
                }
        </div>
        <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text"
                    className="form-control"
                    placeholder="Input Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(event) => setSearch(event.target.value)} />
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
