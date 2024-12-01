import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex-1 flex flex-col justify-center items-center "
      style={
        {
          // background: "radial-gradient(at right top, #01FF39, #52ADD3)",
        }
      }
    >
      <h1 className="text-4xl font-bold">🎄 Advent of Code 2024 🎄</h1>
      <div className="grid grid-cols-5 gap-4 mt-8">
        {DAYS.map((stars, day) => {
          return <DayCard key={day} stars={stars} day={day} />;
        })}
      </div>
    </div>
  );
}

const DayCard = ({ stars, day }: { stars: number; day: number }) => {
  const getStars = () => {
    const GoldStar = <FaStar className="text-yellow-400" />;
    const RegStar = <FaRegStar className="opacity-25" />;
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

const DAYS = [
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
