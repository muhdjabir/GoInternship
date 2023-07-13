type Company = {
    id: number;
    name: string;
    industry: string;
    description: string;
    url: string;
};

type LoginInput = {
    username: string;
    password: string;
}

type SignupInput = {
    username: string;
    email: string;
    password: string;
}

export type {Company, LoginInput, SignupInput};