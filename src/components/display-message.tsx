import React from 'react'

type Props = {
    co2: number | null;
    temperature: number | null;
    humidity: number | null;
}

export default function DisplayMessage({ co2, temperature, humidity }: Props) {
    let message = "";
    let backgroundColor = "";

    const co2Status = co2
    ? co2 > 1200
        ? "danger"
        : co2 > 800
        ? "warning"
        : "normal"
    : "unknown";

    const tempStatus = temperature
    ? temperature < 18 || temperature > 30
        ? "danger"
        : (temperature >= 18 && temperature <= 19) || (temperature >= 27 && temperature <= 30)
        ? "warning"
        : "normal"
    : "unknown";

    const humidityStatus = humidity
    ? humidity < 30 || humidity > 70
        ? "danger"
        : (humidity >= 30 && humidity <= 39) || (humidity >= 61 && humidity <= 70)
        ? "warning"
        : "normal"
    : "unknown";

    // Calculer la priorité (Rouge > Orange > Vert)
    if ([co2Status, tempStatus, humidityStatus].includes("danger")) {
        backgroundColor = "bg-red-500";
        message = "Danger détecté : Prenez immédiatement des mesures.";
        if (co2 && co2 > 1200) {
        message = "Niveau critique de CO2 détecté. Aérez immédiatement la pièce.";
        } else if (temperature && (temperature < 18 || temperature > 30)) {
        message = "Température critique détectée. Ajustez les conditions.";
        } else if (humidity && (humidity < 30 || humidity > 70)) {
        message = "Humidité critique détectée. Vérifiez la ventilation.";
        }
    } 
    else if ([co2Status, tempStatus, humidityStatus].includes("warning")) {
        backgroundColor = "bg-orange-400";
        message = "Attention : Surveillez les conditions.";
        if (co2 && co2 >= 801 && co2 <= 1200) {
        message = "Concentration élevée de CO2 détectée. Aérez la pièce.";
        } else if (temperature && ((temperature >= 18 && temperature <= 19) || (temperature >= 27 && temperature <= 30))) {
        message = "Température légèrement inconfortable. Ajustez si nécessaire.";
        } else if (humidity && ((humidity >= 30 && humidity <= 39) || (humidity >= 61 && humidity <= 70))) {
        message = "Humidité légèrement hors normes. Prenez des mesures.";
        }
    } 
    else if (co2Status === "normal" && tempStatus === "normal" && humidityStatus === "normal") {
        backgroundColor = "bg-green-400";
        message = "Tout va bien. Conditions optimales détectées.";
    } 
    else {
        backgroundColor = "bg-gray-400";
        message = "Données insuffisantes pour évaluer les conditions.";
    }

  return (
    <div className={`p-4 rounded text-white ${backgroundColor}`}>
      <p className="font-semibold">{message}</p>
    </div>
  )
}