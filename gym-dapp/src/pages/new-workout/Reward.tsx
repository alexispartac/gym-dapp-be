
export function Reward( { sets, volume } : { sets : number, volume: number } ) {
  const reward = sets * volume * 0.01;

  return Math.round(reward);
}

export default Reward