import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../shared/components/Checkbox.tsx";
import Input from "../../staff/components/Input.jsx";
import { Filters } from "../../types/opportunities.ts";

interface PopUpMenuProps {
    setFunction: () => void;
    reset: () => void;
    filters: Filters;
    setFilters: (activeFilters: string[], filterMap: Filters) => void;
}

interface Major {
    code: string;
    name: string;
}

export default function PopUpMenu({ setFunction, reset, filters, setFilters }: PopUpMenuProps) {
    const [majors, setMajors] = useState<Major[]>();
    const [validYears, setValidYears] = useState<string[]>([]);

    const checkboxes: [string, string[], "years" | "credits"][] = [
        ["Class Year", validYears, "years"],
        ["Credits", ["1", "2", "3", "4"], "credits"]
    ];

    useEffect(() => {
        const fetchMajors = async () => {
            const url = `${import.meta.env.VITE_BACKEND_SERVER}/majors`;
            const response = await fetch(url);
            if (!response.ok) {
                console.log("Error fetching majors");
            } else {
                const data = await response.json();
                setMajors(data);
            }
        };
        fetchMajors();
    }, []);

    useEffect(() => {
        const fetchYears = async () => {
            const url = `${import.meta.env.VITE_BACKEND_SERVER}/years`;
            const response = await fetch(url);
            if (!response.ok) {
                console.log("Error fetching valid years");
            } else {
                const data = await response.json();
                setValidYears(data);
            }
        };
        fetchYears();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            years: [],
            credits: [],
            hourlyPay: filters.hourlyPay ?? 0,
            majors: []
        },
    });

    interface FormData {
        years: string[];
        credits: string[];
        hourlyPay: number;
        majors: string[];
    }

    function formatCredits(credits: string[]): string | null {
        if (credits.length === 4) {
            return "1-4 Credits";
        } else if (credits.length === 1) {
            return `${credits[0]} ${credits[0] === "1" ? "Credit" : "Credits"}`;
        } else if (JSON.stringify(credits) === JSON.stringify(["1", "2", "3"])) {
            return "1-3 Credits";
        } else if (JSON.stringify(credits) === JSON.stringify(["2", "3", "4"])) {
            return "2-4 Credits";
        } else if (credits.length === 0) {
            return null;
        } else {
            return `${credits.join(", ")} Credits`;
        }
    }

    function submitHandler(data: FormData) {
        const { years, credits, hourlyPay, majors } = data;
        const newFilterMap: Filters = {
            years: years.map(Number),
            credits: credits,
            hourlyPay: Number(hourlyPay),
            majors: majors
        };

        const activeFilters: string[] = [
            ...years,
            ...(formatCredits(credits) ? [formatCredits(credits)!] : []),
            ...(Number(hourlyPay) > 0 ? [`$${Number(hourlyPay).toFixed(2)}/hr+`] : []),
            ...majors
        ];
        setFilters(activeFilters, newFilterMap);
        setFunction();
    }

    return (
        <section
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-500/75 dark:bg-black/60 transition-opacity"
                aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/* Modal shell */}
                    <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl text-gray-900 dark:text-gray-100">
                        <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-4 border-gray-100 dark:border-gray-700">
                            <div className="text-2xl font-semibold text-center pb-3">
                                Filters
                            </div>

                            <section className="flex flex-col">
                                <form
                                    onSubmit={handleSubmit((data) => {
                                        submitHandler(data as FormData);
                                    })}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Scrollable content */}
                                    <section className="flex flex-col max-h-[480px] overflow-y-auto">
                                        {/* Year / credits checkboxes */}
                                        <section className="flex justify-center">
                                            {checkboxes.map((filter) => (
                                                <div className="w-1/3" key={filter[2]}>
                                                    <CheckBox
                                                        errors={errors}
                                                        errorMessage={filter[2] + " checkbox failed"}
                                                        label={filter[0]}
                                                        options={filter[1]}
                                                        formHook={{ ...register(filter[2], {}) }}
                                                        name={filter[2]}
                                                        type="checkbox"
                                                        filters={filters}
                                                    />
                                                </div>
                                            ))}
                                        </section>

                                        {/* Hourly pay input */}
                                        <section className="flex justify-center">
                                            <Input
                                                errors={errors}
                                                label="Minimum Hourly Pay"
                                                name={"hourlyPay"}
                                                errorMessage={"Hourly pay must be at least 0"}
                                                formHook={{
                                                    ...register("hourlyPay", {
                                                        required: "Hourly pay is required",
                                                        validate: (value: number) =>
                                                            value >= 0 ||
                                                            "Hourly pay must be greater or equal to 0",
                                                        pattern: {
                                                            value: /^\d+(\.\d{1,2})?$/,
                                                            message:
                                                                "Hourly pay must be a positive number with up to two decimal places"
                                                        }
                                                    })
                                                }}
                                                type="float"
                                                options={[]}
                                                placeHolder="Enter minimum hourly pay"
                                            />
                                        </section>

                                        {/* Majors list */}
                                        <section className="pt-7 flex flex-col justify-center">
                                            <h1 className="font-semibold text-lg text-center">
                                                Majors
                                            </h1>
                                            <section className="flex justify-center py-4">
                                                <select
                                                    multiple
                                                    size={5}
                                                    {...register("majors", {})}
                                                    className="form-multiselect block w-3/4 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                                                >
                                                    {majors &&
                                                        majors.map((major, index) => (
                                                            <option
                                                                key={index}
                                                                value={major.code}
                                                                className="py-2 px-3 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                                                selected={filters.majors.includes(
                                                                    major.code
                                                                )}
                                                            >
                                                                {major.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </section>
                                        </section>
                                    </section>

                                    {/* Footer buttons */}
                                    <section className="flex flex-row justify-center gap-4 sm:gap-0">
                                        <div className="w-1/3 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={setFunction}
                                                className="btn btn-primary border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 w-1/2 hover:text-gray-900 hover:bg-gray-200 hover:border-gray-500 dark:hover:bg-gray-700 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                        <div className="w-1/3 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    reset();
                                                    setFunction();
                                                }}
                                                className="btn btn-primary border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 w-1/2 hover:text-gray-900 hover:bg-gray-200 hover:border-gray-500 dark:hover:bg-gray-700 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Reset
                                            </button>
                                        </div>

                                        <div className="w-1/3 flex justify-center">
                                            <input
                                                type="submit"
                                                value="Search"
                                                className="btn btn-primary bg-blue-700 text-gray-100 w-1/2 hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </section>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
