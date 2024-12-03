import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getInputsQueryOptions, getStarsQueryOptions } from "@/hooks/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";

export const Route = createFileRoute("/$year/days/$day")({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    const year = params.year;
    const day = params.day;
    if (+day < 1 || +day > 25) {
      throw redirect({ to: "/" });
    }
    await queryClient.ensureQueryData(getStarsQueryOptions(year));
    await queryClient.ensureQueryData(getInputsQueryOptions(year, day));
  },
});

enum InputTab {
  Input = "input",
  Custom = "custom",
}

function RouteComponent() {
  const { day, year } = Route.useParams();

  const { data: stars } = useSuspenseQuery(getStarsQueryOptions(year));
  const { data: inputText } = useSuspenseQuery(
    getInputsQueryOptions(year, day)
  );

  const navigate = Route.useNavigate();
  const dayStars = stars[+day - 1];

  const [inputTab, setInputTab] = useState(InputTab.Input);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [solution, setSolution] = useState({
    part1: "",
    part2: "",
    runTime: 0,
  });

  const userText = inputTab === InputTab.Custom ? input : inputText;
  const runSolution = async () => {
    setIsRunning(true);
    const result = await fetch(`/api/inputs/${year}/${day}?type=js`, {
      method: "POST",
      body: JSON.stringify({ input: userText.trim() }),
    }).then((res) => res.json());
    setIsRunning(false);

    setSolution(result);
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
        <span className="flex items-center gap-1 ml-2">
          {new Array(dayStars).fill(0).map((_, i) => (
            <GiRoundStar
              key={i}
              className="w-5 h-5 text-yellow-400 stroke-black stroke-[10%]"
            />
          ))}
        </span>
      </span>

      <div className="flex mx-auto gap-4 mt-4 w-full flex-1 max-h-[600px]">
        {/* Inputs */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <Tabs
            defaultValue={inputTab}
            onValueChange={(value) => {
              setInputTab(value as InputTab);
            }}
            className="w-full flex flex-col h-full"
          >
            <TabsList>
              <TabsTrigger value={InputTab.Input}>Input</TabsTrigger>
              <TabsTrigger value={InputTab.Custom}>Custom</TabsTrigger>
            </TabsList>

            <Textarea
              disabled={inputTab !== InputTab.Custom}
              className="mt-4 h-full"
              onChange={(e) => setInput(e.target.value)}
              value={userText}
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
