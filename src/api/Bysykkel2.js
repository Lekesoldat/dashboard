const Bysykkel2 = () => {
  const [data, setData] = useState(null);

  // Fetch data when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const res = await Trondheim.get('station_status.json');
      setData(res.data);
    };

    fetchData();
  }, []);

  // If no data present, - show loader
  if (!data) {
    return <BarLoader />;
  }

  return JSON.stringify(data.data.stations.find(x => x.station_id == '293')); // Dette er ved Sintef
};
