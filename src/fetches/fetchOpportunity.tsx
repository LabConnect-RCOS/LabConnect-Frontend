interface findDetailsProps {
    setDetails: React.Dispatch<React.SetStateAction<getOpportunityData | string>>,
    id: string | undefined,
}

export default async function fetchOpoortunity({setDetails, id}: findDetailsProps) {
    const data = await fetchData(id);
    var details = data || "Nothing found";
    setDetails(details);
}

const fetchData= async (id: string | undefined) => {
    // Consider moving the base URL to a configuration
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunity/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    console.log(data);
    return data["data"];
};