import { Email } from "../valueObjects/Email";

export interface CustomerProperties {
    firstname: string;
    lastname: string;
    age: number;
    id: string;
    password : string;
    email : string;
}


export class Customer {
    props: CustomerProperties;

    constructor(
        props: CustomerProperties
    ) {
        this.props = props;
    }

    static create(props: CustomerProperties) {
        const isEmailValid = Email.validate(props.email);
        if (!isEmailValid) {
            throw new Error('EMAIL_INVALID');
        }
        return new Customer(props);
    }

    update(props: {
        firstname: string;
        lastname: string;
        age: number;
    }) {
        this.props.firstname = props.firstname;
        this.props.lastname = props.lastname;
        this.props.age = props.age;
    }
}
