import { Application } from "@/typesheet";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton, Tooltip } from "@material-tailwind/react";
import EditApplicationCard from "./EditApplicationCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteApplication } from "@/redux/features/applicationSlice";
import { useAppSelector } from "@/redux/store";
export default function ApplicationTile({
    application,
    classes,
}: {
    application: Application;
    classes: string;
}) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );

    // In case needed
    // const handleDelete = async () => {
    //     const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/application/${application.ID}`,
    //         {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //     );
    //     const json = await response.json();

    //     if (response.ok) {
    //         dispatch(deleteApplication(application.ID));
    //     }
    // };

    return (
        <tr key={application.company}>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <h5 className="text-sm font-bold">{application.company}</h5>
                </div>
            </td>
            <td className={classes}>
                <h5 className="text-sm font-normal">{application.role}</h5>
            </td>
            <td className={classes}>
                <h5 className="text-sm font-normal whitespace-pre-wrap">
                    {application.assessment}
                </h5>
            </td>
            <td className={classes}>
                <div className="w-max">
                    <Chip
                        size="sm"
                        variant="ghost"
                        value={application.status}
                        color={
                            application.status === "Offered"
                                ? "green"
                                : application.status === "Pending"
                                ? "amber"
                                : "red"
                        }
                    />
                    {application.status === "Pending" && (
                        <Chip
                            size="sm"
                            variant="ghost"
                            value={
                                application.process[
                                    application.process.length - 1
                                ]
                            }
                            className="mt-4"
                            color="teal"
                        />
                    )}
                </div>
            </td>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <h5 className="text-sm font-normal capitalize">
                            {application.platform}
                        </h5>
                    </div>
                </div>
            </td>
            <td className={classes}>
                <h5 className="text-sm font-normal">
                    {new Date(application.CreatedAt).toDateString()}
                </h5>
            </td>
            <td className={classes}>
                <h5 className="text-sm font-normal">
                    {new Date(application.UpdatedAt).toDateString()}
                </h5>
            </td>
            <td className={classes}>
                {application.status === "Pending" && (
                    <Tooltip content="Edit Application">
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => setOpen(true)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </td>
            <EditApplicationCard
                open={open}
                handleOpen={() => setOpen(!open)}
                application={application}
            />
        </tr>
    );
}
