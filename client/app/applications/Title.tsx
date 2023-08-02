import { Button, CardHeader, Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function Title({
    setOpen,
    setFilter,
}: {
    setOpen: (open: boolean) => void;
    setFilter: (filter: string) => void;
}) {
    return (
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-bold">Recent Applications</h2>
                    <h3 className="text-lg font-normal">
                        These are details about your recent applications
                    </h3>
                </div>
                <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<SearchIcon />}
                            color="teal"
                            onChange={(e) =>
                                setFilter(e.target.value.toLowerCase())
                            }
                        />
                    </div>
                    <Button
                        className="flex items-center gap-3"
                        color="teal"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <PostAddIcon />
                        Add Application
                    </Button>
                </div>
            </div>
        </CardHeader>
    );
}
