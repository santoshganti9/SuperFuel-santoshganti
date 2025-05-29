import type { TJsSnippetResult } from "interfaces/jssnippet";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const JsSnippetResult = () => {
  const { snippetId } = useParams();
  const [JsSnippetResult, setJsSnippetResult] = useState<TJsSnippetResult>();
  //Assuming that the snippets are just pure JS. Not JSX. Where Node JS in the backend would run the snippet and kust give the result in a string format.
  const handleJsSnippet = async (snippetId: string) => {
    try {
      const response = await fetch(`/api/jssnippet/${snippetId}`);
      const data = await response.json();
      setJsSnippetResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    snippetId && handleJsSnippet(snippetId);
  }, [snippetId]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center align-baseline">
      <div className="p-8 m-4 border rounded-xl shadow-md w-[50vw] align-middle self-center h-">
        <div className="text-xl pb-1.5">
          The Result of {JsSnippetResult?.name} is:
        </div>

        <div className="h-[50vh]">{JsSnippetResult?.result}</div>
      </div>
    </div>
  );
};

export default JsSnippetResult;
