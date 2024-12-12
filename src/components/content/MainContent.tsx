"use client";
import React, { useEffect, useState } from "react";
import { Droplets, ThermometerSun, Wind } from "lucide-react";
import CardDataStats from "../card-data-stats";
import { database } from "@/firebase/config";
import { ref, onValue } from "firebase/database";
import { roundNumber } from "@/utils/roundNumber";
import { calculatePercentageChange } from "@/utils/calculatePercentageChange";
import ChartOne from "../charts/ChartOne";
import DisplayMessage from "../display-message";

export default function MainContent() {
  const [latestData, setLatestData] = useState({
    temperature: null as number | null,
    co2: null as number | null,
    humidity: null as number | null,
  });

  const [previousData, setPreviousData] = useState({
    temperature: null as number | null,
    co2: null as number | null,
    humidity: null as number | null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataRef = ref(database, "Lawrence_Lessig/data");

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const keys = Object.keys(data);

          const sortedKeys = keys.sort((a, b) => Number(a) - Number(b));

          const secondLastKey = sortedKeys[sortedKeys.length - 2]; // Avant-dernière clé
          const latestKey = sortedKeys[sortedKeys.length - 1]; // Dernière clé

          const secondLast = data[secondLastKey];
          const mostRecent = data[latestKey];

          const roundedPreviousData = secondLast
            ? {
                temperature: roundNumber(secondLast.temperature),
                co2: roundNumber(secondLast.co2),
                humidity: roundNumber(secondLast.humidity),
              }
            : previousData;

          const roundedLatestData = mostRecent
            ? {
                temperature: roundNumber(mostRecent.temperature),
                co2: roundNumber(mostRecent.co2),
                humidity: roundNumber(mostRecent.humidity),
              }
            : latestData;

          // Mettre à jour les états
          setPreviousData(roundedPreviousData);
          setLatestData(roundedLatestData);

          console.info(error);
        }
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // Calculer les pourcentages de changement
  const temperatureChange = calculatePercentageChange(
    latestData.temperature,
    previousData.temperature
  );
  const co2Change = calculatePercentageChange(latestData.co2, previousData.co2);
  const humidityChange = calculatePercentageChange(
    latestData.humidity,
    previousData.humidity
  );

  console.log("temperatureChange", temperatureChange);
  console.log("co2Change", co2Change);
  console.log("humidityChange", humidityChange);

  return (
    <div className="flex flex-col space-y-11">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bonjour, Bienvenue 👋</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <CardDataStats
          title="Température"
          value={latestData.temperature || 0}
          mValue="°"
          levelUp={temperatureChange.levelUp}
          percentageValue={temperatureChange.value}
          levelDown={temperatureChange.levelDown}
        >
          <ThermometerSun className="stroke-primary-blue-light dark:stroke-white" />
        </CardDataStats>
        <CardDataStats
          title="CO2"
          value={latestData.co2 || 0}
          mValue="ppm"
          levelUp={co2Change.levelUp}
          percentageValue={co2Change.value} 
          levelDown={co2Change.levelDown}
        >
          <Wind className="stroke-primary-blue-light dark:stroke-white" />
        </CardDataStats>
        <CardDataStats
          title="Humidité"
          value={latestData.humidity || 0}
          mValue="%"
          levelUp={humidityChange.levelUp}
          percentageValue={humidityChange.value}
          levelDown={humidityChange.levelDown}
        >
          <Droplets className="stroke-primary-blue-light dark:stroke-white" />
        </CardDataStats>
      </div>

      <div>
        <DisplayMessage
          co2={latestData.co2}
          temperature={latestData.temperature}
          humidity={latestData.humidity}
        />
      </div>

      <div>
        <ChartOne />
      </div>
    </div>
  );
}
