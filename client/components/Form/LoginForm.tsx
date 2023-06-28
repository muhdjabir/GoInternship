import {
    Card,
    Input,
    Button,
    Typography,
    CardHeader,
} from "@material-tailwind/react";
import Link from "next/link";

const LoginForm = () => {
    return (
        <Card
            className="mx-auto justify-center"
            color="transparent"
            shadow={false}
        >
            <Typography variant="h4" color="blue-gray">
                Login to your account
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Email" />
                    <Input type="password" size="lg" label="Password" />
                </div>
                <Button className="mt-6 " fullWidth>
                    Login
                </Button>
                <Link href="/signup">
                    <p className="text-blue-400">Dont have an account?</p>
                </Link>
            </form>
        </Card>
    );
};

export default LoginForm;
