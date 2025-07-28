import { LeaderBoardData } from '@/types';

const LeaderBoardRow = ({
  rank,
  city,
  homesSolarized,
  isLastRow,
}: LeaderBoardData) => (
  <tr
    className={`${isLastRow && 'border-b-0'} border-background-dark-100 border-b`}
  >
    <td className="font-dm-sans leading-trim py-5 pl-2 text-left text-xl font-normal text-white">
      {rank}
    </td>
    <td className="font-dm-sans leading-trim py-5 text-left text-xl font-normal text-white">
      {city}
    </td>
    <td className="font-dm-sans leading-trim py-5 pr-2 text-right text-xl font-normal text-white">
      {homesSolarized}
    </td>
  </tr>
);

export default LeaderBoardRow;
