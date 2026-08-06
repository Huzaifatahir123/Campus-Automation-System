"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { Loader2 } from "lucide-react";

type Parent = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

type ParentSearchProps = {
  error?: string|undefined;
  value: string | null;
  onChange: (value: string) => void;
};

const ParentSearch = ({ value, onChange }: ParentSearchProps) => {
  const [query, setQuery] = useState("");
  const [parent, setParent] = useState<Parent | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(parent)
  console.log(value)
const fetchParentById = async () => {
  if (!value) return;

  try {
    const res = await axios.get(`/api/parent/${value}`);
    setParent(res.data);
  } catch (err) {
    console.error(err);
  }
};
  const searchParent = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setParent(null);

    try {
      const res = await axios.get("/api/parent/search", {
        params: {
          query,
        },
      });

      setParent(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Parent not found");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (value && !parent) {
    fetchParentById();
  }
}, [value]);
  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs uppercase tracking-wide text-neutral-500">
        Search Parent
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter email or phone number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="button"
          onClick={searchParent}
          className="px-4 rounded-lg bg-accent-500 text-white"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="animate-spin w-4 h-4" />
          Searching...
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {parent && (
        <div className="border rounded-lg p-3 flex justify-between items-center">
          <div>
            <h3 className="font-medium">
              {parent.first_name} {parent.last_name}
            </h3>

            <p className="text-sm text-neutral-500">
              {parent.phone}
            </p>

            <p className="text-sm text-neutral-500">
              {parent.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
  onChange(parent.id.toString());

  setQuery(parent.phone); // or parent.email
}}
            className={`px-4 py-2 rounded-lg ${
              value === parent.id
                ? "bg-green-600 text-white"
                : "bg-accent-500 text-white"
            }`}
          >
            {value === parent.id ? "Selected" : "Select"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ParentSearch;