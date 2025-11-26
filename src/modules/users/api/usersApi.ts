//This is the part of the app that will talk with the api

//This is the gateway that my frontend receives the data
import axios from 'axios'
import type { UserReadDto } from './dtos'
import type { UserModel } from '../models/UserModel'

//Like a normalization 

//Translate to UserModel hence application can start using it universally and correctly
const mapUserReadDtoToUserModel = (dto: UserReadDto): UserModel => {
    return {
        id: dto.id,
        name: dto.name,
        role: dto.role === 'Admin' ? 'Admin' : 'User', // Map string to union type
        status: dto.status,
        isLoaded: false, // Default value for loading state
        isError: false, // Default value for error state
    }
}

//the fetching part
export const getUsers = async (): Promise<UserModel[]> => {
    //The reason we can try catch because axios has a built in error handler mechanism that allows you to catch meaningful error from it
    try {
        //Built in json parser and error handling how cancel token and progress
        const response = await axios.get('https://6925b66d82b59600d724dacf.mockapi.io/api/users');
        const data = response.data as UserReadDto[];
        return data.map(mapUserReadDtoToUserModel);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error after logging it
    }
}

export const getUserById = async (userId: number): Promise<UserModel> => {
    try {
        const response = await axios.get(`https://6925b66d82b59600d724dacf.mockapi.io/api/users/${userId}`);
        const data = response.data as UserReadDto;
        const userModel = mapUserReadDtoToUserModel(data);
        return userModel;
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}