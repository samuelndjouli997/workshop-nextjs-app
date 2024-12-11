"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { database } from "@/firebase/config";
import { ref, onValue } from "firebase/database";
import { roundNumber } from "@/utils/roundNumber";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {};

export default function ChartOne(props: Props) {
  const [chartData, setChartData] = useState({
    labels: [] as string[], // Les dates ou timestamps
    datasets: [
      {
        label: "Température (°C)",
        data: [] as number[],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "CO2 (ppm)",
        data: [] as number[],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Humidité (%)",
        data: [] as number[],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    const dataRef = ref(database, "Lawrence_Lessig/data");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const keys = Object.keys(data).sort((a, b) => Number(a) - Number(b));
        const labels = keys.map((key) => new Date(Number(key)).toLocaleString()); // Convertir les timestamps en dates lisibles

        const temperatures = keys.map((key) => roundNumber(data[key].temperature || 0));
        const co2Levels = keys.map((key) => roundNumber(data[key].co2 || 0));
        const humidities = keys.map((key) => roundNumber(data[key].humidity || 0));

        setChartData({
          labels,
          datasets: [
            { ...chartData.datasets[0], data: temperatures },
            { ...chartData.datasets[1], data: co2Levels },
            { ...chartData.datasets[2], data: humidities },
          ],
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white dark:bg-gray-700 px-5 pb-5 pt-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h3 className="text-lg font-semibold">Graphique des Mesures</h3>
      </div>
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
}
