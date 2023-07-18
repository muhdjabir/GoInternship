import DataCard from "@/components/cards/DataCard";
import { Resource } from "@/typesheet";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@material-tailwind/react";
import { useAppSelector } from "@/redux/store";

export default function ResourceTile({ resource }: { resource: Resource }) {
    const date = new Date(resource.CreatedAt);
    const userid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );

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
                    <IconButton color="red" size="sm" className="">
                        <DeleteForeverIcon />
                    </IconButton>
                )}
            </div>
        </DataCard>
    );
}
