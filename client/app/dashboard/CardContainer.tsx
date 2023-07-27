import { Dashboard } from "@/typesheet";
import { useAppSelector } from "@/redux/store";
import NumberCard from "@/components/cards/NumberCard";

export default function CardContainer() {
    const dashboard: Dashboard = useAppSelector(
        (state) => state.persistedReducer.dashboard.value
    );

    return (
        <div className="flex flex-row justify-between my-5">
            <NumberCard
                title="Pending Applications"
                color="teal-400"
                data={dashboard.pending}
            />
            <NumberCard
                title="Rejected Applications"
                color="teal-400"
                data={dashboard.rejected}
            />
            <NumberCard
                title="Successful Applications"
                color="teal-400"
                data={dashboard.offered}
            />
            <NumberCard
                title="Total Companies"
                color="teal-400"
                data={dashboard.companies}
            />
        </div>
    );
}
