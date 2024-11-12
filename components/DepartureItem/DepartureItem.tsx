'use client';
import clsx from 'clsx';

import { DepartureProps } from '@/types';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';
import { useNotification } from '@/notifications/useNotification';
import { useState } from 'react';

// const walkingTimeInMilisecs = 3 * 60 * 1000;

type DepartureItemProps = {
  departure: DepartureProps;
  time: number;
};

const DepartureItem = ({ departure, time }: DepartureItemProps) => {
  // console.count('DepartureItem');
  const { isSupported, isSubscribed, handleSubscribe, subscription } =
    useNotification();

  const sendNotification = async (title: string, message: string) => {
    await fetch('/api/web-push/send', {
      method: 'POST',
      body: JSON.stringify({ title, message, subscription }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const prediction = new Date(
    departure.departure_timestamp.predicted ||
      departure.departure_timestamp.scheduled
  ).getTime();
  const diff = prediction - time;

  if (diff < 0) return <></>;

  return (
    <div
      onClick={() => sendNotification('title', 'message')}
      className={clsx(
        'gap-2 grid grid-flow-col auto-cols-[_2.8rem_2fr_auto] w-full text-2xl leading-tight'
        // diff < walkingTimeInMilisecs ? 'text-bone-600 dark:text-bone-800' : ''
      )}
    >
      <span className="font-semibold">{departure.route.short_name}</span>
      <span className="w-full font-normal truncate overflow-hidden">
        {departure.trip.headsign}
      </span>
      <EstimatedTimeArrival diff={diff} />
    </div>
  );
};

export default DepartureItem;
