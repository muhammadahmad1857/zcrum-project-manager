"use client";
import { toast } from "sonner";
import { useState, Dispatch, SetStateAction } from "react";

type FetchFunction = (...args: any[]) => Promise<{ data?: any; error?: string }>;

interface FetchState {
  data: any;
  loading: boolean;
  error: any;
}

const useFetch = (
  cb: FetchFunction
): FetchState & {
  fn: FetchFunction;
  setData: Dispatch<SetStateAction<any>>;
} => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

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
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
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
