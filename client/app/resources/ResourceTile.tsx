import DataCard from "@/components/cards/DataCard";
import { Resource } from "@/typesheet";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@material-tailwind/react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteResource } from "@/redux/features/resourceSlice";

export default function ResourceTile({ resource }: { resource: Resource }) {
    const date = new Date(resource.CreatedAt);
    const dispatch = useDispatch<AppDispatch>();
    const userid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );

    const handleDelete = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/resource/${resource.ID}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch(deleteResource(resource.ID));
        }
    };

    return (
        <DataCard>
            <div className="p-4 col-span-5">
                <h2 className="font-bold">{resource.title}</h2>
                <h2 className="font-medium">
                    Resource Link: <a href={resource.url}>{resource.url}</a>
                </h2>
                <h2>{resource.description}</h2>
            </div>
            <div className="p-4 col-start-7 col-span-2">
                <h2>Posted: {date.toDateString()}</h2>
                {resource.UserID === userid && (
                    <IconButton
                        color="red"
                        size="sm"
                        className=""
                        onClick={handleDelete}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                )}
            </div>
        </DataCard>
    );
}
