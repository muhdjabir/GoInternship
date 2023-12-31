type Application = {
    ID: number;
    role: string;
	status: string;
	process: string[];
	platform: string;
    company: string;
	assessment: string;
    CreatedAt: string;
    UpdatedAt: string;
	UserID: number;
	CompanyID: number;
}

type Header = {
    title: string;
    value: string;
}

type Company = {
    ID: number;
    name: string;
    industry: string;
    description: string;
    url: string;
    UserID: number;
};

type Resource = {
    ID: number;
    title: string;
    description: string;
    url: string;
    UserID: number;
    CreatedAt: string;
}

type LoginInput = {
    username: string;
    password: string;
}

type SignupInput = {
    username: string;
    email: string;
    password: string;
}


type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: number;
    token: string;
}

type InitialResourceState = {
    value: Resource[];
}

type InitialCompanyState = {
    value: Company[];
}

type InitialApplicationState = {
    value: Application[];
}

type SankeyNode = {
    source: string;
    target: string;
    value: number
}

type Node = {
    id: string;
    nodeColor: string;
}

type SankeyData = {
    nodes: Node[];
    links: SankeyNode[];
}

type Dashboard = {
    offered: number;
    rejected: number;
    pending: number;
    companies: number;
    sankey: SankeyNode[];
}

type InitialDashboardState = {
    value: Dashboard;
}

export type {
    Header,
    Application,
    Company,
    Resource,
    LoginInput,
    SignupInput,
    InitialState,
    AuthState,
    InitialResourceState,
    InitialCompanyState,
    InitialApplicationState,
    InitialDashboardState,
    SankeyNode,
    Node,
    SankeyData,
    Dashboard
};