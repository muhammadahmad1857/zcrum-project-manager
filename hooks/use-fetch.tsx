"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type FetchFunction = (...args: any[]) => Promise<{ data?: any; error?: string }>;

interface FetchState {
  data: any;
  loading: boolean;
  error: string | null;
}

const useFetch = (
  cb: FetchFunction
): FetchState & {
  fn: FetchFunction;
  setData: Dispatch<SetStateAction<any>>;
} => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fn: FetchFunction = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);

      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setData(response.data);
      }

      return response; // Return the server response
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fn,
    setData,
  };
};

export default useFetch;
