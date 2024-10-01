import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/api-client";

const apiClient = new APIClient("/employees");

const useEmployee = (id) =>
  useQuery({
    queryKey: ["employees", id],
    queryFn: () => apiClient.getOne(id),
  });

export default useEmployee;
