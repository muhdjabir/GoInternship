import { Button, CardFooter, IconButton } from "@material-tailwind/react";

export default function Pagination({
    currentPage,
    handlePageChange,
    totalPages,
}: {
    currentPage: number;
    handlePageChange: (number: number) => void;
    totalPages: number;
}) {
    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
                variant="outlined"
                color="blue-gray"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <IconButton
                        key={index}
                        variant="text"
                        color="blue-gray"
                        size="sm"
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </IconButton>
                ))}
            </div>
            <Button
                variant="outlined"
                color="blue-gray"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </CardFooter>
    );
}
