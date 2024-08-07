import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAccPro = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: acceptedProducts = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["acceptedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/accPro");
      return res.data;
    },
  });

  return [acceptedProducts, loading, refetch];
};

export default useAccPro;
