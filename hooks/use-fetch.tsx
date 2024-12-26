"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type FetchFunction = (
  ...args: any[]
) => Promise<{ data?: any; error?: string }>;

interface FetchState {
  data: any;
  loading: boolean;
  error: string | null;
}

const useFetch = (
  cb: any
): FetchState & {
  fn: FetchFunction;
  setData: Dispatch<SetStateAction<any>>;
} => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const parseError = (err: any): string => {
    // Check for Prisma P2002 error
    if (err.code === "P2002" && err.meta?.target) {
      const fields = err.meta.target.join(", ");
      return `The following fields must be unique: ${fields}`;
    }
    // Default error message
    return err.message || "An unexpected error occurred";
  };

  const fn: FetchFunction = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);

      if (response.error) {
        const errorMessage = parseError(response.error);
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setData(response.data);
      }

      return response; // Return the server response
    } catch (err: any) {
      const errorMessage = parseError(err);
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
