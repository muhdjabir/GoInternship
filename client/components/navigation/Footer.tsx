import { Typography, IconButton } from "@material-tailwind/react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import WebIcon from "@mui/icons-material/Web";

const Footer = () => {
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
            <Typography color="blue-gray" className="font-normal ml-10">
                &copy; 2023 Muhammad Jabir
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 mr-10">
                {/* <li>
                    <Typography
                        as="a"
                        href="https://www.linkedin.com/in/muhd-jabir-bja/"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        <LinkedInIcon />
                        Linkedin
                    </Typography>
                </li> */}
                <li>
                    <Typography
                        as="a"
                        href="https://github.com/muhdjabir"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        <GitHubIcon />
                        GitHub
                    </Typography>
                </li>
                {/* <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        <ArticleIcon />
                        Resume
                    </Typography>
                </li> */}
                <li>
                    <Typography
                        as="a"
                        href="https://disctimeo-sg.onrender.com/"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        <WebIcon />
                        Disctimeo
                    </Typography>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
