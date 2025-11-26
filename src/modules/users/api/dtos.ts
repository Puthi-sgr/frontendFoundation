//The DTO in this api is concern with the shape that it recieves form my backend controller

//This shape is map 1:1 direclty from teh DTO contract defined in my backend

export interface UserReadDto {
    id: number;
    name: string;
    role: string;
    status: boolean;
}