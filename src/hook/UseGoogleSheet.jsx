const useGoogleSheet = (gasUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(gasUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
        } else if (result.error) {
          throw new Error(result.error);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("GAS Fetch error:", err);
        setError("Failed to load data. Check console for details.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gasUrl]);

  return { data, loading, error };
};
