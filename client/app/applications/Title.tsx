import {
    Button,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Title() {
    return (
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Recent Transactions
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        These are details about the last transactions
                    </Typography>
                </div>
                <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                    <Button
                        className="flex items-center gap-3"
                        color="blue"
                        size="sm"
                    >
                        <ArrowDownTrayIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                        />
                        Download
                    </Button>
                </div>
            </div>
        </CardHeader>
    );
}
