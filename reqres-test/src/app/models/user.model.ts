export class UserList{
    constructor(
        public page: number,
        public per_page: number,
        public total: number,
        public total_pages: number,
        public data: Array<User>
    ){}
}

export interface UserGet {
    data:    User;
    support: Support;
}

export class User{
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public avatar: string,
    ){}
}

export interface Support {
    url:  string;
    text: string;
}