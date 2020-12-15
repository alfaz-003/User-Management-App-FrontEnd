export class User {
    public id: number;

    public userId: string;

    public firstName: string;

    public lastName: string;

    public username: string;

    public password: string;

    public email: string;

    public profileImgUrl: string;

    public lastLogindate: Date;

    public lastLogindateDisplay: Date;

    public joinDate: Date;

    public role: string;

    public authorities: [];

    public isActive: Boolean;

    public isNotLocked: Boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.username = '' ;
        this.email = '' ;
        this.isActive= false;
        this.isNotLocked =false;
        this.role = '';
        this.authorities = [];
    }
}