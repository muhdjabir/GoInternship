import DataCard from "@/components/cards/DataCard";
import { Resource } from "@/typesheet";

export default function ResourceTile({ resource }: { resource: Resource }) {
    return (
        <DataCard>
            <div className="py-4 my-4">
                <h2>{resource.title}</h2>
                <h2>{resource.url}</h2>
                <h2>{resource.description}</h2>
            </div>
        </DataCard>
    );
}
