import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const Route = createFileRoute("/days/$day")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const day = +params.day;
    if (day < 1 || day > 25) {
      throw redirect({ to: "/" });
    }

    return { day };
  },
});

function RouteComponent() {
  const { day } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const [inputTab, setInputTab] = useState("sample");
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [solution, setSolution] = useState({
    part1: "",
    part2: "",
    runTime: 0,
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputTab === "custom") {
      return;
    }
    fetch(`/day${day}/${inputTab}.txt`)
      .then((res) => res.text())
      .then((text) => {
        if (inputRef.current) inputRef.current.value = text;
      });
  }, [day, inputTab]);

  const runSolution = async () => {
    setIsRunning(true);
    const { default: run } = await import(`../../days/${day}/index.ts`);
    const start = performance.now();
    const result = run(inputRef.current?.value || "");
    const end = performance.now();
    setIsRunning(false);

    setSolution({
      part1: result.part1.toString(),
      part2: result.part2.toString(),
      runTime: end - start,
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full flex-1 flex flex-col">
      {/* Header */}
      <span className="flex items-center gap-1 ">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/" })}
          size="icon"
          className="ml-[-10px] leading-none"
        >
          <FaArrowLeft />
        </Button>
        <h1 className="text-2xl font-bold">Day {day}</h1>
      </span>

      <div className="flex mx-auto gap-4 mt-4 w-full flex-1 max-h-[600px]">
        {/* Inputs */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <Tabs
            defaultValue={inputTab}
            onValueChange={(value) => {
              setInputTab(value);
              if (value === "custom" && inputRef.current) {
                inputRef.current.value = input;
              }
            }}
            className="w-full flex flex-col h-full"
          >
            <TabsList>
              <TabsTrigger value="sample">Sample</TabsTrigger>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>

            <Textarea
              disabled={inputTab !== "custom"}
              ref={inputRef}
              className="mt-4 h-full"
              onChange={(e) => setInput(e.target.value)}
            />
          </Tabs>
        </div>

        <div className="h-fit flex-1 bg-white p-4 rounded-lg shadow-md max-w-[200px]">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold">Part 1</h2>
              <p>{solution.part1 || "Not run"}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Part 2</h2>
              <p>{solution.part2 || "Not run"}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Run time</h2>
              <p>{solution.runTime.toFixed(3)}ms</p>
            </div>
          </div>

          <Button
            className="mt-4"
            disabled={isRunning}
            onClick={() => {
              runSolution();
            }}
          >
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>
    </div>
  );
}
