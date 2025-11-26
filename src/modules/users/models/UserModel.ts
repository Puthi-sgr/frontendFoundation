// This is the data shape that will be USED by your frontend

//Used by the store
//By pages/views
//By smaller components


// This model becomes the single source of true shape for my frontend to use
// They the response may differ but this shape  will use those response to combine into this full shape
export interface UserModel {
    id: number;
    name: string;
    role: 'Admin' | 'User'; // This is like validating a DTO but from a frontend perspective
    status: boolean;

    //Does not comes from the api but useful for frontend state management
    //This is PER user state
    isLoaded: boolean; // New field to track loading state
    isError: boolean; // New field to track error state
}