import { Application } from "@/typesheet";
import ApplicationTile from "./ApplicationTile";

export default function TableData({
    getCurrentPageData,
    data,
}: {
    getCurrentPageData: () => Application[];
    data: any[];
}) {
    return (
        <tbody>
            {getCurrentPageData().map((application: Application, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                return (
                    <ApplicationTile
                        key={application.ID}
                        application={application}
                        classes={classes}
                    />
                );
            })}
        </tbody>
    );
}
