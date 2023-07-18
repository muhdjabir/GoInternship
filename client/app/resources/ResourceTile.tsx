import DataCard from "@/components/cards/DataCard";
import { Resource } from "@/typesheet";

export default function ResourceTile({ resource }: { resource: Resource }) {
    const date = new Date(resource.CreatedAt);

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
            </div>
        </DataCard>
    );
}
