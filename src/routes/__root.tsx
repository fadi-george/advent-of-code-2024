import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createRootRoute } from "@tanstack/react-router";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center p-4 bg-slate-200"
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
    <Card className="min-w-24">
      <CardHeader className="text-center">
        <h2 className="text-lg font-bold">Day {day + 1}</h2>
      </CardHeader>
      <CardContent className="justify-center flex text-2xl gap-1 ">
        {getStars()}
      </CardContent>
    </Card>
  );
};

const DAYS = [
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
