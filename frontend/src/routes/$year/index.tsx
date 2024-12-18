import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getStarsQueryOptions, getTotalStarsQueryOptions } from "@/hooks/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { GiRoundStar } from "react-icons/gi";

export const Route = createFileRoute("/$year/")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) => {
    const year = params.year;
    if (+year < 2015 || +year > new Date().getFullYear() || isNaN(+year)) {
      redirect({ to: `/${year}` });
    }
    return Promise.all([
      queryClient.ensureQueryData(getStarsQueryOptions(year)),
      queryClient.ensureQueryData(getTotalStarsQueryOptions()),
    ]);
  },
});

function RouteComponent() {
  const year = Route.useParams().year;
  const { data: stars } = useSuspenseQuery(getStarsQueryOptions(year));
  const { data: totalStars } = useSuspenseQuery(getTotalStarsQueryOptions());

  return (
    <>
      {/* Stars Total */}
      <div className="justify-end absolute top-6 right-7 hidden md:hidden ">
        <HoverCard>
          <HoverCardTrigger className="flex items-center gap-2 text-xl font-bold focus:outline-none cursor-default ">
            {totalStars}{" "}
            <GiRoundStar className="text-yellow-400  stroke-[12%] stroke-black  " />
          </HoverCardTrigger>
          <HoverCardContent side="bottom" className="w-fit p-2">
            Total Stars
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Days "Calendar" */}
      <div className="flex-1 flex flex-col justify-center items-center ">
        <h1 className="sm:text-4xl text-2xl font-bold">
          🎄 Advent of Code <YearDropdown year={+year} /> 🎄
        </h1>
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(108px,1fr))] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4 mt-8 max-w-[608px] w-full">
          {stars.map((stars, day) => {
            return <DayCard key={day} stars={stars} day={day} />;
          })}
        </div>
      </div>
    </>
  );
}

const YearDropdown = ({ year }: { year: number }) => {
  const navigate = Route.useNavigate();
  const currentYear = new Date().getFullYear();
  const years = new Array(currentYear - 2015 + 1).fill(0).map((_, i) => currentYear - i);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer underline decoration-dotted underline-offset-[8px]">
        {year}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[80px] justify-center max-h-[120px] overflow-y-auto"
        side="top"
      >
        {years.map((y) => (
          <DropdownMenuItem
            className=" justify-center text-lg "
            key={y}
            disabled={y === year}
            onClick={() => navigate({ to: `/${y}` })}
          >
            {y}
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    <Link to={`./days/${day + 1}`}>
      <Card className="min-w-24 hover:scale-105 transition-all">
        <CardHeader className="text-center sm:p-6 p-3">
          <h2 className="text-lg font-bold">Day {day + 1}</h2>
        </CardHeader>
        <CardContent className="justify-center flex sm:text-2xl text-lg gap-1 sm:p-6 p-3 sm:pt-0">
          {getStars()}
        </CardContent>
      </Card>
    </Link>
  );
};
