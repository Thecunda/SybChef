class User {
    _id:string;
    username: string;
    firstName: string;
    lastName: string;
    hash: string;
	lang: string;
	admin: boolean;

    constructor(
    ){
        this.username = ""
        this.firstName = ""
        this.lastName = ""
        this.hash = ""
		this.admin = false
    }
}

export default User;
