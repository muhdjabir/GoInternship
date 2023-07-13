import DataCard from "@/components/cards/DataCard";
import { Company } from "@/typesheet";

export default function CompanyTile({ company }: { company: Company }) {
    return (
        <DataCard>
            <div className="py-4 my-4">
                <h2>{company.name}</h2>
            </div>
        </DataCard>
    );
}
