// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { FetchDepartures } from '@/utils/server';

const departures = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  const departures = await FetchDepartures(name);
  res.status(200).json(departures);
};

export default departures;
