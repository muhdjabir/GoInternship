import { Avatar, Chip, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

export default function TableData({
    getCurrentPageData,
    data,
}: {
    getCurrentPageData: () => any[];
    data: any[];
}) {
    return (
        <tbody>
            {getCurrentPageData().map(
                (
                    {
                        name,
                        amount,
                        date,
                        status,
                        account,
                        accountNumber,
                        expiry,
                    },
                    index
                ) => {
                    const isLast = index === data.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={name}>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    <h5 className="text-sm font-bold">
                                        {name}
                                    </h5>
                                </div>
                            </td>
                            <td className={classes}>
                                <h5 className="text-sm font-normal">
                                    {amount}
                                </h5>
                            </td>
                            <td className={classes}>
                                <h5 className="text-sm font-normal">{date}</h5>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={status}
                                        color={
                                            status === "paid"
                                                ? "green"
                                                : status === "pending"
                                                ? "amber"
                                                : "red"
                                        }
                                    />
                                </div>
                            </td>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                        <Avatar
                                            src={
                                                account === "visa"
                                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                            }
                                            size="sm"
                                            alt={account}
                                            variant="square"
                                            className="h-full w-full object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h5 className="text-sm font-normal capitalize">
                                            {account.split("-").join(" ")}{" "}
                                            {accountNumber}
                                        </h5>
                                        <h5 className="text-sm font-normal opacity-70">
                                            {expiry}
                                        </h5>
                                    </div>
                                </div>
                            </td>
                            <td className={classes}>
                                <Tooltip content="Edit User">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    );
                }
            )}
        </tbody>
    );
}
