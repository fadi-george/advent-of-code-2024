import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStarsQueryOptions } from "@/hooks/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaRegStar } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getStarsQueryOptions),
});

function RouteComponent() {
  const { data: stars } = useSuspenseQuery(getStarsQueryOptions);

  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-bold">🎄 Advent of Code 2024 🎄</h1>
      <div className="grid grid-cols-5 gap-4 mt-8">
        {stars.map((stars, day) => {
          return <DayCard key={day} stars={stars} day={day} />;
        })}
      </div>
    </div>
  );
}

const DayCard = ({ stars, day }: { stars: number; day: number }) => {
  const getStars = () => {
    const GoldStar = <GiRoundStar className="text-yellow-400" />;
    const RegStar = <GiRoundStar className="opacity-15" />;
    switch (stars) {
      case 2:
        return (
          <>
            {GoldStar}
            {GoldStar}
          </>
        );
      case 1:
        return (
          <>
            {GoldStar}
            {RegStar}
          </>
        );
      default:
        return (
          <>
            {RegStar}
            {RegStar}
          </>
        );
    }
  };

  return (
    <Link to={`/days/${day + 1}`}>
      <Card className="min-w-24 hover:scale-105 transition-all">
        <CardHeader className="text-center">
          <h2 className="text-lg font-bold">Day {day + 1}</h2>
        </CardHeader>
        <CardContent className="justify-center flex text-2xl gap-1 ">
          {getStars()}
        </CardContent>
      </Card>
    </Link>
  );
};
