import { Dashboard } from "@/typesheet";
import { useAppSelector } from "@/redux/store";
import NumberCard from "@/components/cards/NumberCard";

export default function CardContainer() {
    const dashboard: Dashboard = useAppSelector(
        (state) => state.persistedReducer.dashboard.value
    );

    return (
        <div className="flex flex-col justify-between my-5">
            <NumberCard
                title="Total Applications"
                color="teal"
                data={
                    dashboard.pending + dashboard.offered + dashboard.rejected
                }
            />
            <NumberCard
                title="Total Companies"
                color="teal"
                data={dashboard.companies}
            />
        </div>
    );
}
