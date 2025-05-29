import type { TJsSnippet } from "interfaces/jssnippet";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Toaster } from "~/components/ui/sonner";
import { Textarea } from "~/components/ui/textarea";

const JSSNippetCreationForm = () => {
  const navigate = useNavigate();
  const [jsSnippetFormData, setJSSnippetFormData] = useState<TJsSnippet>({
    name: "",
    jsSnippet: "",
  });
  const [error, setError] = useState<boolean>(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJSSnippetFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleJSSnippet = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJSSnippetFormData((prev) => ({
      ...prev,
      jsSnippet: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/jssnippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsSnippetFormData),
      });
      if (response.ok) {
        navigate("/");
      } else {
        setError(true);
        console.error("Error adding snippet:", await response.text());
      }
    } catch (error) {
      console.error("Error adding snippet:", error);
    }
  };

  useEffect(() => {
    //timer to set error off
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, [error]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="p-8 mr-0 border rounded-xl shadow-md w-[50vw] align-middle self-center h-[75vh]">
        <div className="text-xl pb-1.5"> Add New JS Snippet</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={jsSnippetFormData.name}
            onChange={handleName}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Snippet
          </label>
          <Textarea
            className="min-h-[38vh] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="jsSnippet"
            name="jsSnippet"
            value={jsSnippetFormData.jsSnippet}
            onChange={handleJSSnippet}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button className="cursor-pointer" onClick={handleSubmit}>
            Save
          </Button>
        </div>
        {error && (
          <div className="text-red-500">Please insert a valid JS Snippet!</div>
        )}
      </div>

      <div className="p-6 bg-card rounded-lg border shadow-sm h-[75vh] w-[50vw] overflow-scroll">
        <h2 className="text-xl font-semibold mb-3">
          JavaScript Snippet Format
        </h2>
        <p className="mb-4">
          Your JavaScript snippet should evaluate to a value that will be
          displayed as the result. The last value or expression in your snippet
          will be returned as the result.
        </p>

        <h3 className="text-lg font-medium mb-2">Example Format:</h3>
        <pre className="bg-muted p-3 rounded-md mb-4 overflow-x-auto">
          <code>{`// Your code here
// ...

// The last expression will be returned as the result
"Your result string" // or any other value`}</code>
        </pre>

        <h3 className="text-lg font-medium mb-2">Sample Snippet:</h3>
        <pre className="bg-muted p-3 rounded-md mb-4 overflow-x-auto">
          <code>{`// A simple function that calculates factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Calculate factorial of 5
const result = factorial(5);

// This string will be returned as the result
"The factorial of 5 is " + result;`}</code>
        </pre>

        <div className="bg-accent/30 p-4 rounded-md">
          <p className="font-medium">
            <strong>Note:</strong> The snippet is executed in a Node.js
            environment. Make sure your code returns a value at the end, as this
            will be displayed as the result.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JSSNippetCreationForm;
