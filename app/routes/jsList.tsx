import type { TJsSnippet } from "interfaces/jssnippet";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "~/components/ui/table";

const JSList = () => {
  const [JsSnippets, setJsSnippets] = useState<TJsSnippet[]>([]);
  const navigate = useNavigate();

  const fetchJsSnippets = async () => {
    try {
      const response = await fetch("/api/jssnippets");
      const data = await response.json();
      setJsSnippets(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchJsSnippets();
    () => {
      setJsSnippets([]);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-end p-2">
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/create-snippet")}
        >
          Add JS Snippet
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.no.</TableHead>
            <TableHead>Snippet Name</TableHead>
            <TableHead>View Snippet</TableHead>
            {/* <TableHead>Edit Snippet</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {JsSnippets.map((snippet, index) => (
            <TableRow
              key={snippet.id}
              onClick={() => {
                navigate(`/view-snippet/${snippet.id}`);
              }}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{snippet.name}</TableCell>
              <TableCell className="flex justify-center align-middle w-fit">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    navigate(`/view-snippet/${snippet.id}`);
                  }}
                >
                  View
                </Button>
              </TableCell>
              {/* <TableCell>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    navigate(`/view-snippet/${snippet.id}`);
                  }}
                >
                  Edit
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JSList;
