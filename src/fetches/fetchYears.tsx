

interface fetchYearsProps{
    setYears: React.Dispatch<React.SetStateAction<string[]>>;
    setLoading: React.Dispatch<React.SetStateAction<string | boolean>>;
}

export default async function fetchYears({setYears, setLoading}: fetchYearsProps) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/years`);

    if (response.ok) {
        const data = await response.json();
        setYears(data);
    } else {
        console.log("No response for years");
        setLoading("no response");
    }
}