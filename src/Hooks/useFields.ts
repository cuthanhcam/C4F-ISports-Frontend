import { useState, useEffect } from "react";
import { getFields } from "../Services/fieldService";


export const useFields = (page: number = 1, pageSize: number = 10) => {
    const [fields, setFields] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchFields = async () => {
          try {
            setLoading(true);
            const data = await getFields(page, pageSize);
            setFields(data.items);
          } catch (error) {
            setError("Failed to fetch fields.");
          } finally {
            setLoading(false);
          }
        };

        fetchFields();
  }, [page, pageSize]);

  return { fields, loading, error }
};