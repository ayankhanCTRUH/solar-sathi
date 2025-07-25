import { LeaderBoardIcon } from '@/components/icons';
import { CITIES_DATA } from '@/data/constants';
import LeaderBoardRow from './LeaderBoardRow';

const LeaderBoard = () => {
  return (
    <div className="bg-background-dark-200 flex flex-col gap-8 rounded-xl border border-neutral-400 px-5 py-6 shadow-(--testimonial-shadow) backdrop-blur-sm">
      <div className="flex gap-3">
        <LeaderBoardIcon />
        <span className="font-dm-sans text-2xl/[33px] font-medium tracking-[-0.96px] text-white">
          Top Maharashtra Cities
        </span>
      </div>
      <table>
        <thead>
          <tr>
            {['Rank', 'City', 'Homes Solarized'].map((item, index) => (
              <th
                key={index}
                className={`font-dm-sans leading-trim text-neutral-450 pb-5 ${index === 2 ? 'text-right' : 'text-left'} text-lg font-normal`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CITIES_DATA.map((city, index) => (
            <LeaderBoardRow
              key={city.rank}
              rank={city.rank}
              city={city.city}
              isLastRow={index === CITIES_DATA.length - 1}
              homesSolarized={city.homesSolarized}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
